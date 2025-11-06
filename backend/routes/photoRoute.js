const authmiddleware = require("../middlewares/authMiddleware");
const router = require("express").Router();
const Photos = require("../models/Photos");

router.post("/addphoto",authmiddleware , async (req, res) => {
    const {path} = req.body;

    if(!path){
        return res.status(400).send({message:"Add photo"})
    }
    try{
        const newPhoto = new Photos({
            path: path
        })
        await newPhoto.save();
        return res.status(200).send({message:"Successfully added photo"});
    }catch(err){
        return res.status(500).send({message:"Error" + err.message})
    }

})

module.exports = router;