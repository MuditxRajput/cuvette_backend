import express from 'express';
import { companyController, login, verify } from '../Controllers/companyController.js';
import { jobPosting } from '../Controllers/jobPostingController.js';
import { sendMail } from '../Controllers/sendMail.js';
const router = express.Router();
router.post('/register',companyController)
router.post('/jobPosting',jobPosting)
router.post('/verify',verify)
router.post('/mail',sendMail)
router.post('/login',login)

export default router;