const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const passport = require("passport");

require("./config/passport-setup")

const userRoute = require("./routes/userRoute");
const GoogleRoutes =  require( "./routes/google.js");
const photoRoute = require("./routes/photoRoute.js");
const categoryRoute = require("./routes/categoryRoute.js");
const adminRoute = require("./routes/adminRoute.js");
const productRoute = require("./routes/productRoute.js");


dotenv.config();

const app = express();


app.use(session({
    secret: "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",
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Działa")
})
app.use("/uploads", express.static("uploads"));


app.use('/api/users', userRoute);
app.use("/api/google", GoogleRoutes);
app.use("/api/photos", photoRoute);
app.use("/api/cat", categoryRoute);
app.use("/api/admin", adminRoute);
app.use("/api/products", productRoute);





mongoose.connect(process.env.MONGO_URI, {
})
    .then(() => {
        console.log("Połączono z MongoDB");
        app.listen(process.env.PORT, () => {
            console.log(`Serwer działa na porcie ${process.env.PORT}`);
        })
    })
    .catch(err => {
        console.log("Błąd");
        console.log(err)
    });
