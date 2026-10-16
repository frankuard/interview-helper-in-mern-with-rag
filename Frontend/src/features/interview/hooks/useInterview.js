import { useContext } from "react";
import { getAllInterviewReports, generateInterviewReport, getInterviewReportById } from "../services/interview.api";
import { InterviewContext } from "../interview.context";



export const useInterview = () => {
    const context = useContext(InterviewContext)

    if (!context){
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const {loading,setLoading, report,setReport, reports, setReports} = context

    const generateReport = async ({jobDescription, selfDescription, resumeFile}) => {
        setLoading(true)
        try{
            const response = await generateInterviewReport({jobDescription,selfDescription, resumeFile})
            setReport(response.interviewReport)
        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        let response = null
        try{
            response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
        return response.interviewReport
    }

     const getReports = async () => {
        setLoading(true)
        let response = null
        try{
            response = await getAllInterviewReports()
            setReport(response.interviewReport)
        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
        return response.interviewReports
    }

    return {loading,report, reports, generateReport, getReportById, getReports}
    
}