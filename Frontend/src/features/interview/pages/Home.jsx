import "../style/Home.scss"

const Home = () => {
  return (
    <main className="home">
         <h1 className="home-title">
          Create Your Custom <span className="highlight">Interview Plan</span>
        </h1>
        <div className="interview-input-group">
        <div className="left">
            <textarea name="jobDescription" id="jobDescription" placeholder="Enter job description here"></textarea>
        </div>
        <div className="right">
            <div className="input-group">
                <p>Resume <small className="highlight">(Use Resume and self description together for best results)</small></p>
                <label htmlFor="resume">Upload Resume</label>
                <input type="file" name="resume" id="resume" accept=".pdf"/>
            </div>
            <div className="input-group">
                <label htmlFor="selfDescription">Self Description</label>
                <textarea name="selfDescription" id="selfDescription" placeholder="Describe yourself in a sentence"></textarea>
            </div>
            <button className="generate-btn ">Generate Interview Report</button>
        </div>
        </div>
    </main>
  )
}

export default Home