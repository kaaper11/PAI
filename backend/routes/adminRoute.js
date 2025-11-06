const User = require('../models/Users');
const authmiddleware = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.get("/modName", authmiddleware ,async (req, res) => {

    try{
        const mods = await User.find({role: "mod"});
        if(mods.length === 0){
           return res.status(403).send("You don't have any moderators.");
        }
        return res.json(mods);

    }catch(err){
        return res.status(500).send({message: err.message});
    }
})

module.exports = router;
