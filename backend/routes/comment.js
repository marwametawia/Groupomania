const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const commentCtrl = require("../controllers/comment");

// POST
router.post("/:postId", auth, commentCtrl.createComment);
//GET
router.get("/:postId", auth, commentCtrl.getAllComments);
router.get("/:postId", auth, commentCtrl.getOneComment);
//DELETE
router.delete("/:commentId", auth, commentCtrl.deleteComment);

module.exports = router;
