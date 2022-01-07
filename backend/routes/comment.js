const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const commentCtrl = require("../controllers/comment");

// POST
router.post("/", auth, commentCtrl.createComment);
//GET
router.get("/", auth, commentCtrl.getAllComments); // 


//DELETE
router.delete("/:commentId", auth, commentCtrl.deleteComment);

module.exports = router;
