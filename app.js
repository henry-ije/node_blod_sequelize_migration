const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const postsRoute = require("./routes/posts")
const userRoute = require("./routes/user")
const imageRoute = require("./routes/images")

app.use(bodyParser.json());
app.use("./uploads", express.static("uploads"))

app.use("/posts", postsRoute)
app.use("/user", userRoute)
app.use("/image", imageRoute)

module.exports = app
