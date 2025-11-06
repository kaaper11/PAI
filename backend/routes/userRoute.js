const User = require('../models/Users')
const UserToken = require('../models/UserTokens')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authmiddleware = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/register", async (req, res) => {
    const { email, password, firstName, lastName, phoneNumber } = req.body;

    if (!email || !password || !firstName || !lastName || !phoneNumber) {
        return res.status(400).json({ message: "All fields are required" });
    }


    try{
        const user = await User.findOne({ email : email });
        if (user) {
            return res.status(400).json({message: "Account already exists!"});
        }

        const newUser = new User({
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
        })
        await newUser.save();

        return res.status(201).json({message: "Your account has been registered, now you can login!"});
    }catch(err){
        console.log(err)
        return res.status(500).json({error: err.message});
    }
})



router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(400).json({message: "User not found, check your email!"});
        }

        if (await bcrypt.compare(password, user.password)) {
            const token_Access = jwt.sign({
                    userId: user._id, role: user.role
                },
                process.env.JWT_SECRET,
                {expiresIn: "59m"}
            )

            const token_Refresh = jwt.sign({
                userId: user._id
            },
                process.env.JWT_SECRET_REFRESH,
                {expiresIn: "7d"})

            const token_RefreshToken = new UserToken({
                userId: user._id,
                token: token_Refresh
            })
            await token_RefreshToken.save();

            res.cookie('refreshToken', token_Refresh, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 7*24*60*60*1000
            })

            res.json({token: token_Access})
        } else {
            return res.status(400).json({message: "Password don't match!"});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

router.post("/refresh", async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(400).json({ message: "We do not have refresh token!" });
    }

    try {
        // weryfikacja tokena
        const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);

        // sprawdzenie w bazie
        const dataToken = await UserToken.findOne({ token: refreshToken });
        if (!dataToken) {
            return res.status(400).json({ message: "Invalid refresh token!" });
        }

        // generowanie nowego access tokena
        const token_access = jwt.sign(
            { userId: decodedRefresh.userId, role: decodedRefresh.role },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        res.json({ token: token_access });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


router.get('/name',authmiddleware , async (req, res) => {
    try{
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(400).json({message: "User not found!"});
        }
        console.log(user)
        res.json(user);
    }catch(err){
        return res.status(500).json({error: err.message});
    }
})

router.delete('/logout',authmiddleware , async (req, res) => {
    try{
        await UserToken.findOneAndDelete({userId: req.user.userId})
        res.status(200).json({message: "User removed!"});
    }catch(err){
        return res.status(500).json({error: err.message});
    }
})

module.exports = router;
