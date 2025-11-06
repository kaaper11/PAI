const authmiddleware = require("../middlewares/authMiddleware");
const mongoose = require("mongoose");
const router = require("express").Router();
const Category = require("../models/Categories");
const {use} = require("express/lib/application");

router.post("/category", authmiddleware, async (req, res) => {
    const {name, parentId} = req.body;

    if (!name) {
       return res.status(400).json({message:"Name is required."});
    }
    try{
        const cat = new Category({
            name: name,
            parentId: parentId,
        })
        await cat.save();
        res.status(201).json({ message: "Category created", category: cat });
    }catch(err){
        res.status(400).json({message: err.message});
    }
})

router.get("/nameCategory", authmiddleware, async (req, res) => {

    try{
        const categories = await Category.find();
        res.json(categories);

    }catch(err){
        res.status(400).json({message: err.message});
    }
})

router.put("/assignCategory", authmiddleware, async (req, res) => {
    const {catId, modId} = req.body;

    try {
                await Category.findByIdAndUpdate(catId,{
                mod: modId
            })
    }catch(err){
        console.log(err);
        res.status(400).json({message: err.message});
    }
})

router.get('/catToModify', authmiddleware, async (req, res) => {
    const user = req.user;

    if(!user){
        return res.status(400).json({message:"User not found"});
    }
    try{
        const categories = await Category.find({mod: user.userId});
        return res.status(200).json(categories);

    }catch(err){
        return res.status(400).json({message: err.message});
    }
})

module.exports = router;