import { ApiError } from "../utility/ApiError.js"

export const verifyRole= (roles)=>{
    return async (req, res, next)=>{
        if (!roles.includes(req.user.role)) {
            throw new ApiError(403, "Access denied")
        }
        next()
    }
}

