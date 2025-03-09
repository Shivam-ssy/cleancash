
import aws from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config()


export const rekognition = new aws.Rekognition({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
})