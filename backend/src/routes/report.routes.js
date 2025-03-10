
import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { createReport,getReport,getReports, updateReportStatus ,getReportByUser, getReportByOfficer, assignReport, getReportForOfficer} from "../controllers/report.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { verifyRole } from "../middleware/role.middleware.js";
const router = Router()

router.route('/create-report').post(verifyJwt,upload.single("image"),createReport)
router.route('/get-report/:id').get(verifyJwt,getReport)
router.route('/get-all-report').get(verifyJwt,verifyRole("admin"),getReports)
router.route('/update-report/:id').patch(verifyJwt,verifyRole("officer"),updateReportStatus)
router.route('/get-report-by-user').get(verifyJwt,getReportByUser)
router.route('/get-report-by-officer').get(verifyJwt,verifyRole("officer"),getReportByOfficer)
router.route('/assign-report/:id').post(verifyJwt,verifyRole("admin"),assignReport)
router.route('/get-report-for-officer').get(verifyJwt,verifyRole("officer"),getReportForOfficer)

export default router