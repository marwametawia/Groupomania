const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const commentCtrl = require("../controllers/comment");

// POST
router.post("/", auth, commentCtrl.createComment);
//GET
router.get("/", auth, commentCtrl.getAllComments); // querystring ou searchparams
router.get("/:commentId", auth, commentCtrl.getOneComment);
//DELETE
router.delete("/:commentId", auth, commentCtrl.deleteComment);

module.exports = router;
