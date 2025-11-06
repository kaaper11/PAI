const passport = require("passport");
const User = require("../models/Users");
const UserToken = require("../models/UserTokens");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: "97987939891-ii02cl3f7n0qnl5o18nbm7euivfjkdtd.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:5000/api/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = new User({
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                    });
                    await user.save();
                }
                const token_Refresh = jwt.sign({
                        userId: user._id
                    },
                    process.env.JWT_SECRET_REFRESH,
                    {expiresIn: "7d"})

                const token = new UserToken({
                    userId: user._id,
                    token: token_Refresh,
                });
                await token.save();

                return done(null, user);
            } catch (err) {
                console.error("❌ Error in GoogleStrategy:", err);
                return done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
