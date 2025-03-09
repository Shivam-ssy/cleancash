
import { Router } from "express";
import { createAnyUser, generateOtp, login, register, verifyOtp } from "../controllers/user.contoller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { verifyRole } from "../middleware/role.middleware.js";

const router = Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/validate-otp').post(verifyOtp)
router.route('/generate-otp').post(generateOtp)

// auth routes 
router.route('/create-user').post(verifyJwt,verifyRole("admin"),createAnyUser)

export default router