const express = require("express");
const compression = require("compression");
const app = express();
const PORT = process.env.PORT || 3000;

const UserRourter = require("./routes/UserRoute");
const SurveyRouter = require("./routes/SurveyRoute");

app.use(compression({ filter: (req, res) => true, brotli: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", UserRourter);
app.use("/api/survey", SurveyRouter);


app.listen(PORT, () => {
    console.log(`Sevidor rodando em http://localhost:${PORT}`);
})
