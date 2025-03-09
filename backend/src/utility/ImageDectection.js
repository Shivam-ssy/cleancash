import { asyncHandler } from "./asyncHandler.js";
import {
  RekognitionClient,
  DetectLabelsCommand,
} from "@aws-sdk/client-rekognition";
import dotenv from "dotenv";
dotenv.config();
import { ApiError } from "./ApiError.js";

const rekognitionClient = new RekognitionClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Helper function to calculate percentage
const calculatePercentage = (total, value) => {
  return ((value / total) * 100).toFixed(2);
};

// Pollution Categories
const pollutionCategories = {
  landPollution: [
    "Garbage",
    "Landfill",
    "Littering",
    "Dump Yard",
    "Waste Disposal",
    "Construction Waste",
  ],
  waterPollution: [
    "Oil Spill",
    "Water Pollution",
    "Contaminated Water",
    "Garbage in Water",
    "Industrial Waste",
  ],
  plasticPollution: [
    "Plastic Waste",
    "Littering",
    "Dump Yard",
    "Waste Disposal",
  ],
  chemicalPollution: [
    "Toxic Waste",
    "Hazardous Waste",
    "Industrial Chemicals",
    "Chemical Spill",
  ],
  airPollution: [
    "Smoke",
    "Smog",
    "Air Pollution",
    "Factory Emission",
    "Vehicle Exhaust",
    "Burning Waste",
  ],
  noisePollution: [
    "Loudspeaker",
    "Heavy Traffic",
    "Construction Site",
    "Industrial Noise",
    "Crowded Streets",
  ],
};

const imageDetection = async (image) => {
  try {
    const params = {
      Image: { Bytes: image.buffer },
      MaxLabels: 15, // Increased for better detection
      MinConfidence: 70,
    };

    const command = new DetectLabelsCommand(params);
    const rekognitionResponse = await rekognitionClient.send(command);
    console.log(rekognitionResponse);

    // Function to categorize pollution labels
    const categorizePollution = (labels) => {
      let pollutionResults = {
        landPollution: [],
        waterPollution: [],
        plasticPollution: [],
        chemicalPollution: [],
        airPollution: [],
        noisePollution: [],
      };

      labels.forEach((label) => {
        const name = label.Name;
        const confidence = label.Confidence.toFixed(2);

        // Check which category the label belongs to
        for (const category in pollutionCategories) {
          if (pollutionCategories[category].includes(name)) {
            pollutionResults[category].push({ name, confidence });
          }
        }
      });

      return pollutionResults;
    };

    const pollutionData = categorizePollution(rekognitionResponse.Labels);
    const totalPollutionCount = Object.values(pollutionData).reduce(
      (acc, curr) => acc + curr.length,
      0
    );

    if (totalPollutionCount === 0) {
      throw new ApiError(404, "No pollution detected in the image");
    }

    // Calculate percentage for each pollution type
    const pollutionResultPercentage = {};
    for (const category in pollutionData) {
      pollutionResultPercentage[`${category}Percentage`] = calculatePercentage(
        totalPollutionCount,
        pollutionData[category].length
      );
    }

    return { totalPollutionCount, pollutionData, pollutionResultPercentage };
  } catch (error) {
    console.error("AWS Rekognition Error:", error);
    throw new ApiError(500, "Failed to analyze image");
  }
};

export { imageDetection };
