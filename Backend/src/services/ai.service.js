const Groq = require("groq-sdk")
const {z} = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")


const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),

    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),

    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),

    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    
    title: z.string().describe("The title of the job for which the interview report is generated"),
})


async function generateWithGroq(prompt) {
    const jsonSchema = zodToJsonSchema(interviewReportSchema)

    const completion = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages: [
            {
    role: "system",
    content: `You are an interview coach.
Return a complete interview report as valid JSON.
You MUST include all these fields:
matchScore, technicalQuestions, behavioralQuestions, skillGaps, preparationPlan, title.

technicalQuestions and behavioralQuestions must each be arrays of objects containing:
question, intention, answer.

skillGaps must be an array of objects containing:
skill, severity (low, medium, or high).

preparationPlan must be an array of objects containing:
day, focus, tasks (an array of strings).

title must be a string.
matchScore must be an integer between 0 and 100.
Follow the JSON schema provided in the user message exactly.
Do not return unrelated fields such as candidate, strengths, areasForImprovement, or recommendation.
Return JSON only, without Markdown.`
},
            {
                role: "user",
                content: `${prompt}

Respond with ONLY a valid JSON object that follows this JSON schema exactly:
${JSON.stringify(jsonSchema)}

matchScore must be an integer from 0 to 100.`
            }
        ],
        response_format: { type: "json_object" },
        temperature: 0.4
    })

    const content = completion.choices[0].message.content

    return JSON.parse(content)
}


async function generateInterviewReport({resume,selfDescription,jobDescription}) {

    const prompt = `Generate an interview report for a candidate with the following details:
                    Resume: ${resume}
                    Self Description: ${selfDescription}
                    Job Description: ${jobDescription}`

    const parsed = await generateWithGroq(prompt)
    return interviewReportSchema.parse(parsed)
}


module.exports = { generateInterviewReport }