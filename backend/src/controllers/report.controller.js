import { Report } from "../models/report.model.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import { asyncHandler } from "../utility/asyncHandler.js";
import { cloudinary, uploadToCloudinary } from "../utility/cloudinary.js";
import { imageDetection } from "../utility/ImageDectection.js";

export const createReport = asyncHandler(async (req,res, next)=>{
    const requestedUser= req.user
    const image= req.file
    const {description,pollutionType,city,locality,state} = req.body

    console.log(req.body);
    
    if (!description || !pollutionType || !city || !locality || !state) {
        throw new ApiError(404, "All feilds are Required")
    }

    if (!image) {
        throw new ApiError(500, "Something went wrong while uploading the image")
    }
    console.log(image);
    
    const pollutionResult= await imageDetection(image) || {}
    console.log(pollutionResult);

    const cloudinaryUpload= await uploadToCloudinary(image.buffer)
    const report= await Report.create({
        reportedBy: requestedUser._id,
        description,
        image: cloudinaryUpload.secure_url,
        aiLabel: pollutionResult,
        pollutionType,
        address: {
            city,
            locality,
            state
        }
    })
    if (!report) {
        throw new ApiError(500, "Report not created")
      
    }
    // const aiLabel=
    return res.status(200).json(new ApiResponse(200,report,"success"))

})

export const getReport = asyncHandler(async (req,res, next)=>{
    const reportId= req.params.id
    const report= await
    Report.findById(reportId)
    .populate('reportedBy','name email')
    .populate('reviewedBy','name email')
    if (!report) {
        throw new ApiError(404, "Report not found")
    }
    return res.status(200).json(new ApiResponse(200,report,"success"))
}
)

export const getReports = asyncHandler(async (req,res, next)=>{
    const reports= await Report.find()
    .populate('reportedBy','name email')
    .populate('reviewedBy','name email')
    if (!reports) {
        throw new ApiError(404, "Reports not found")
    }
    return res.status(200).json(new ApiResponse(200,reports,"success"))
}
)

export const updateReportStatus = asyncHandler(async (req,res, next)=>{
    const reportId= req.params.id
    const {reportStatus}= req.body
    const report = await Report.findById(reportId)

    if (!report) {
        throw new ApiError(404, "Report not found")
    }
    report.reportStatus= reportStatus
    await report.save()
    return res.status(200).json(new ApiResponse(200,report,"success"))
})

export const getReportByUser = asyncHandler(async (req,res, next)=>{
    const requestedUser= req.user
    const reports= await Report.find({reportedBy:requestedUser._id})
    if (!reports) {
        throw new ApiError(404, "Reports not found")
    }
    return res.status(200).json(new ApiResponse(200,reports,"success"))
}
)

export const getReportByOfficer = asyncHandler(async (req,res, next)=>{
    const requestedUser= req.user
    const reports= await Report.find({reviewedBy:requestedUser._id})
    if (!reports) {
        throw new ApiError(404, "Reports not found")
    }
    return res.status(200).json(new ApiResponse(200,reports,"success"))
}
)

export const assignReport = asyncHandler(async (req,res, next)=>{
    const {reportId,requestedUser}= req.body
    const report= await Report.findById(reportId)
    if (!report) {
        throw new ApiError(404, "Report not found")
    }
    const user= await User.findById(requestedUser._id)
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    report.reviewedBy= requestedUser._id
    await report.save()
    return res.status(200).json(new ApiResponse(200,report,"success"))
}
)

export const getReportForOfficer = asyncHandler(async (req,res, next)=>{
    const user= req.user
    const reports= await Report.find({$or: [
        { "address.city": user.city, "address.state": user.state }, 
        { reviewedBy: user._id }                                     
    ]})
    if (!reports) {
        throw new ApiError(404, "Reports not found")
    }
    return res.status(200).json(new ApiResponse(200,reports,"success"))
})