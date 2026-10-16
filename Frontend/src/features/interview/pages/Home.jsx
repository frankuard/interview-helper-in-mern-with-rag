import { useState } from "react"
import { useInterview } from "../hooks/useInterview"
import "../style/Home.scss"
import { useRef } from "react"
import { useNavigate } from "react-router"

const Home = () => {


    const {loading,generateReport} = useInterview()

    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({jobDescription,selfDescription, resumeFile})
        navigate(`/interview/${data._id}`)  
    }

  return (
    <main className="home">
         <h1 className="home-title">
          Create Your Custom <span className="highlight">Interview Plan</span>
        </h1>
        <div className="interview-input-group">
        <div className="left">
            <textarea
            onChange={(e) => {setJobDescription(e.target.value)}}
            name="jobDescription" id="jobDescription" placeholder="Enter job description here"></textarea>
        </div>
        <div className="right">
            <div className="input-group">
                <p>Resume <small className="highlight">(Use Resume and self description together for best results)</small></p>
                <label htmlFor="resume">Upload Resume</label>
                <input ref={resumeInputRef} type="file" name="resume" id="resume" accept=".pdf"/>
            </div>
            <div className="input-group">
                <label htmlFor="selfDescription">Self Description</label>
                <textarea
                onChange={(e) => {setSelfDescription(e.target.value)}}
                name="selfDescription" id="selfDescription" placeholder="Describe yourself in a sentence"></textarea>
            </div>
            <button
            
            className="generate-btn ">Generate Interview Report</button>
        </div>
        </div>
    </main>
  )
}

export default Home