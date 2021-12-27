const express = require("express");
const routeUser = require("./routes/users");
const routePost= require("./routes/post");
const routeComment = require("./routes/comment");
const helmet = require("helmet");

const app = express();
app.use(express.json());
app.use(helmet());

module.exports = app;

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use("/api/auth", routeUser);
app.use("api/post", routePost);
app.use("api/comment", routeComment);

const db = require("./models");

async function main() {
    await db.sync;
}
main();