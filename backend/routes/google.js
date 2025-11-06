const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const {login} = require("passport/lib/http/request");
const router = express.Router();

router.get("/", passport.authenticate("google", { scope: ["profile", "email"], accessType: "offline",
    prompt: "consent" }));
router.get("/callback", passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        const token_Access = jwt.sign({
                userId: req.user._id, role: req.user.role
            },
            process.env.JWT_SECRET,
            {expiresIn: "15m"}
        )

        res.redirect(`http://localhost:5173/MainPage?token=${token_Access}`);
    }
);

module.exports = router;
