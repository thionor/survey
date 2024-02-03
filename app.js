const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Seja Bem vindo");
});

app.listen(PORT, () => {
    console.log(`Sevidor rodando em http://localhost:${PORT}`);
})
