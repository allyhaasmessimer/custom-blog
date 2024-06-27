const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

const User = require("./models/User");
const Post = require("./models/Post");

const app = express();
const upload = multer(); // No dest, since we don't want to save locally
const salt = bcrypt.genSaltSync(10);
const secret = "fdfdgfdsbt65765ryryvggh";

const s3Client = new S3Client({
    region: "us-east-1", // Change to your preferred region
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

// Database connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Routes
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
    const { username, password } = req.body;
    try {
        const userDoc = await User.findOne({ username });
        if (!userDoc) return res.status(400).json("User not found");

        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign(
                { username, id: userDoc._id },
                secret,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie("token", token).json({
                        id: userDoc._id,
                        username,
                    });
                }
            );
        } else {
            res.status(400).json("Wrong credentials");
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
});

app.post("/logout", (req, res) => {
    res.cookie("token", "").json("ok");
});

app.post("/post", upload.single("file"), async (req, res) => {
    const { originalname, buffer } = req.file;
    const ext = originalname.split(".").pop();

    // Set up S3 upload parameters
    const params = {
        Bucket: "bookofally-media",
        Key: `${Date.now()}_${originalname}`,
        Body: buffer,
    };

    try {
        // Uploading files to the bucket
        const data = await s3Client.send(new PutObjectCommand(params));
        console.log(`File uploaded successfully. ${data.Location}`);

        // File uploaded successfully, save the URL to your database
        const { token } = req.cookies;
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err;
            const { title, summary, content } = req.body;
            const postDoc = await Post.create({
                title,
                summary,
                content,
                cover: `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`, // Save S3 URL in the database
                author: info.id,
            });
            res.json(postDoc);
        });
    } catch (err) {
        console.error("Error uploading file:", err);
        res.status(500).json({
            error: "Failed to upload file",
            message: err.message,
        });
    }
});

// PUT /post endpoint to update a post
app.put("/post/:id", upload.single("file"), async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id } = req.params;
        const { title, summary, content } = req.body;
        const postDoc = await Post.findById(id);

        if (!postDoc) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (postDoc.author.toString() !== info.id.toString()) {
            return res
                .status(403)
                .json({ error: "You are not the author of this post" });
        }

        if (req.file) {
            const { originalname, buffer } = req.file;
            const ext = originalname.split(".").pop();

            // Set up S3 upload parameters
            const params = {
                Bucket: "bookofally-media",
                Key: `${Date.now()}_${originalname}`,
                Body: buffer,
            };

            try {
                // Upload file to S3 bucket
                const data = await s3Client.send(new PutObjectCommand(params));
                const coverUrl = `https://bookofally-media.s3.amazonaws.com/${params.Key}`;

                // Update post details with new cover URL
                postDoc.title = title;
                postDoc.summary = summary;
                postDoc.content = content;
                postDoc.cover = coverUrl;
            } catch (err) {
                console.error("Error uploading file:", err);
                return res.status(500).json({ error: "Failed to upload file" });
            }
        } else {
            // No new file uploaded, update other post details
            postDoc.title = title;
            postDoc.summary = summary;
            postDoc.content = content;
        }

        await postDoc.save();
        res.json(postDoc);
    });
});

// Delete post endpoint
app.delete("/post/:id", async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) return res.status(401).json("Invalid token");

        const { id } = req.params;
        const postDoc = await Post.findById(id);

        if (!postDoc) return res.status(404).json("Post not found");

        const isAuthor = postDoc.author.toString() === info.id.toString();
        if (!isAuthor) {
            return res.status(400).json("You are not the author");
        }

        await Post.findByIdAndDelete(id);
        res.json("Post deleted");
    });
});

app.get("/post", async (req, res) => {
    const posts = await Post.find()
        .populate("author", ["username"])
        .sort({ createdAt: -1 })
        .limit(20);
    res.json(posts);
});

app.get("/post/:id", async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate("author", ["username"]);
    res.json(postDoc);
});

// Start server
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
