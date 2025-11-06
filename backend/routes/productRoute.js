const User = require('../models/Users');
const authmiddleware = require("../middlewares/authMiddleware");
const router = require("express").Router();
const Product = require("../models/Products");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });


router.post(
    "/addProduct",
    authmiddleware,
    upload.array("images", 10),
    async (req, res) => {
        try {
            const { name, description, price, category } = req.body;
            const images = req.files.map((file) => file.filename);

            if (!name || !description || !price || !images || !category) {
                return res.status(400).json({ message: "All fields required" });
            }

            const newProduct = new Product({
                name,
                description,
                price,
                images,
                category,
            });

            await newProduct.save();
            res.status(201).json({ message: "Product added successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
);

router.get("/searchproduct", authmiddleware, async (req, res) => {
    const name = req.query.name;

    try {
        const products = await Product.find({name: { $regex: name, $options: "i" }});

        return res.status(200).json(products);
    }catch(err) {
        return res.status(400).json({message:"Something went wrong"});
    }
})

router.get("/oneproduct", authmiddleware, async (req, res) => {
    const id = req.query.id;

    try {
        const product = await Product.findById(id);

        return res.status(200).json(product);
    }catch(err) {
        return res.status(400).json({message:"Something went wrong"});
    }
})

module.exports = router;