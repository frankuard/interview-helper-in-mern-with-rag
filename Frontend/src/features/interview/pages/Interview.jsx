import { useState } from "react"
import "../style/Interview.scss"

const NAV_ITEMS = [
  { id: "technical", label: "Technical Questions" },
  { id: "behavioral", label: "Behavioral Questions" },
  { id: "roadmap", label: "Road Map" },
]

// ── Dummy data ───────────────────────────────────────────────────────────────
const report = {
  matchScore: 78,
  technicalQuestions: [
    {
      question: "What is the event loop in Node.js?",
      intention: "Checks your understanding of async behavior.",
      answer: "The event loop lets Node.js handle many operations without blocking by offloading work and running callbacks when it finishes.",
    },
    {
      question: "How would you use Redis for caching?",
      intention: "Tests practical caching knowledge.",
      answer: "Store frequently read data with a TTL, check the cache first, and fall back to the database on a miss.",
    },
  ],
  behavioralQuestions: [
    {
      question: "Tell me about a time you handled a tight deadline.",
      intention: "Looks at how you prioritize and communicate.",
      answer: "Use the STAR format: describe the situation, your task, the actions you took, and the result.",
    },
  ],
  preparationPlan: [
    { day: 1, focus: "Node.js fundamentals", tasks: ["Revise the event loop", "Practice async/await questions"] },
    { day: 2, focus: "Caching and queues", tasks: ["Learn Redis basics", "Read about message queues"] },
  ],
  skillGaps: [
    { skill: "Redis", severity: "high" },
    { skill: "Message queue", severity: "medium" },
    { skill: "Event loop", severity: "low" },
  ],
}

// ── Sub-components ───────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="q-card">
      <div className="q-card__header" onClick={() => setOpen(!open)}>
        <span className="q-card__index">Q{index + 1}</span>
        <p className="q-card__question">{item.question}</p>
        <span>{open ? "−" : "+"}</span>
      </div>

      {open && (
        <div className="q-card__body">
          <div>
            <span className="q-card__tag">Intention</span>
            <p>{item.intention}</p>
          </div>
          <div>
            <span className="q-card__tag">Model Answer</span>
            <p>{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  )
}

const RoadMapDay = ({ day }) => (
  <div className="roadmap-day">
    <div className="roadmap-day__header">
      <span className="roadmap-day__badge">Day {day.day}</span>
      <h3>{day.focus}</h3>
    </div>
    <ul>
      {day.tasks.map((task, i) => (
        <li key={i}>{task}</li>
      ))}
    </ul>
  </div>
)

// ── Main component ───────────────────────────────────────────────────────────
const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical")

  return (
    <main className="interview">
      <div className="interview-layout">

        {/* Left nav */}
        <div className="left">
          <div className="nav-list">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeNav === item.id ? "active" : ""}`}
                onClick={() => setActiveNav(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Center content */}
        <div className="center">
          {activeNav === "technical" && (
            <section>
              <div className="content-header">
                <h2>Technical Questions</h2>
                <span>{report.technicalQuestions.length} questions</span>
              </div>
              {report.technicalQuestions.map((q, i) => (
                <QuestionCard key={i} item={q} index={i} />
              ))}
            </section>
          )}

          {activeNav === "behavioral" && (
            <section>
              <div className="content-header">
                <h2>Behavioral Questions</h2>
                <span>{report.behavioralQuestions.length} questions</span>
              </div>
              {report.behavioralQuestions.map((q, i) => (
                <QuestionCard key={i} item={q} index={i} />
              ))}
            </section>
          )}

          {activeNav === "roadmap" && (
            <section>
              <div className="content-header">
                <h2>Preparation Road Map</h2>
                <span>{report.preparationPlan.length}-day plan</span>
              </div>
              {report.preparationPlan.map((day) => (
                <RoadMapDay key={day.day} day={day} />
              ))}
            </section>
          )}
        </div>

        {/* Right sidebar */}
        <div className="right">
          <div className="match-score">
            <h3>Match Score</h3>
            <p className="match-score__value">{report.matchScore}%</p>
          </div>

          <div className="skill-gaps">
            <h3>Skill Gaps</h3>
            <div className="tags">
              {report.skillGaps.map((gap, i) => (
                <span key={i} className={`tag tag--${gap.severity}`}>
                  {gap.skill}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}

export default Interview