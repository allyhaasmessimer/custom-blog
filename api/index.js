const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");

const uploadMiddleware = multer({ dest: "uploads/" });
const salt = bcrypt.genSaltSync(10);
const secret = "fdfdgfdsbt65765ryryvggh";
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(
    "mongodb+srv://allyhaas:m1KUtCLOMnzLEPlr@cluster0.teklxhx.mongodb.net/"
);

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(400).json(e);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const userDoc = await User.findOne({ username });

        if (!userDoc) {
            return res.status(400).json("User not found");
        }

        const passOk = bcrypt.compareSync(password, userDoc.password);

        if (passOk) {
            // Generate JWT token
            jwt.sign(
                { username, id: userDoc._id },
                secret,
                {},
                (err, token) => {
                    if (err) throw err;
                    // Send the token as JSON response
                    res.cookie("token", token).json({
                        id: userDoc._id,
                        username,
                    });
                }
            );
        } else {
            // Incorrect password
            res.status(400).json("Wrong credentials");
        }
    } catch (e) {
        // Handle other errors
        res.status(500).json({ error: e.message });
    }
});

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
    res.json(req.cookies);
});

app.post("/logout", (req, res) => {
    res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
    // res.cookie("token", "").json("ok");
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;

    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
        });
        res.json(postDoc);
    });

    // res.json({
    //     postDoc,
    // });
});

app.get("/post", async (req, res) => {
    // const posts = await Post.find().populate('User');
    res.json(await Post.find().populate("author", ["username"]));
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
// m1KUtCLOMnzLEPlr
// mongodb+srv://allyhaas:m1KUtCLOMnzLEPlr@cluster0.teklxhx.mongodb.net/
