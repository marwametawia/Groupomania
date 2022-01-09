const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const commentCtrl = require("../controllers/comment");

// POST
router.post("/:postId/comment/", auth, commentCtrl.createComment);

//GET
router.get("/:postId/comment", auth, commentCtrl.getAllComments); // 


//DELETE
router.delete("/:postId/comment/:commentId/", auth, commentCtrl.deleteComment);

module.exports = router;
