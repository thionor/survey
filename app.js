const express = require("express");
const compression = require("compression");
const app = express();
const PORT = process.env.PORT || 3000;

const UserRourter = require("./routes/UserRoute");
const SurveyRouter = require("./routes/SurveyRoute");
const QuestionRouter = require("./routes/QuestionRoute");
const AnswerRouter = require("./routes/AnswerRoute");
const SurveyUserRouter = require("./routes/SurveyUserRoute");

app.use(compression({ filter: (req, res) => true, brotli: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", UserRourter);
app.use("/api/survey", SurveyRouter);
app.use("/api/question", QuestionRouter);
app.use("/api/answer", AnswerRouter);
app.use("/api/surveyuser", SurveyUserRouter);


app.listen(PORT, () => {
    console.log(`Sevidor rodando em http://localhost:${PORT}`);
})
