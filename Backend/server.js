require("dotenv").config()
const app = require("./src/app");
const connectTODB = require("./src/config/db.js");
const { generateInterviewReport } = require("./src/services/ai.service.js");

connectTODB()



app.listen(3000,() => {
    console.log("Server is running on port 3000")
})

