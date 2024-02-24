const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/", async (req, res) => {
    try {
        const token = req.query.token;
        console.log(token);
        const userData = await UserController.findUserByToken(token);
        
        return res.status(200).json(userData);
    } catch(error) {
        console.log("Erro:", error);
        res.status(500).json({error: 'Error to get user by token'});
    }
})

router.post("/create", async (req, res) => {
   try {

    const { email } = req.body;
    const newUser = await UserController.createUser(email);
    
    res.status(200).json(newUser);

   }  catch(error) {
    console.log("Erro:", error);
    res.status(500).json({ error: 'Error to create User' })
   }
})

module.exports = router;