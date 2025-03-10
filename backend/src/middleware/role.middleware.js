import { ApiError } from "../utility/ApiError.js"

export const verifyRole= (roles)=>{
    
    return async (req, res, next)=>{
        try {
            if (!req.user) {
                throw new ApiError(401, "Unauthorized")
            }
            if (!roles.includes(req.user.role)) {
                throw new ApiError(403, "Access denied")
            }
            next()
        }
        catch(error){
            next(error)
        }
    }
}
       
