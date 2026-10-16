const express = require('express');
const { authUser } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/file.middleware');
const { generateInterviewReportController, getInterviewByIdController, getAllInterviewReportsController } = require('../controllers/interview.controller');

const interviewRouter = express.Router()


/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description, resume PDF and job description
 * @access private
 */
interviewRouter.post("/",authUser,upload.single("resume"), generateInterviewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by InterviewId
 * @access private
 */
interviewRouter.get("/report/:interviewId", authUser, getInterviewByIdController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get all interview report of logged in user
 * @access private
 */
interviewRouter.get("/", authUser, getAllInterviewReportsController)

module.exports = interviewRouter;

