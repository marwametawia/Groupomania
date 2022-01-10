const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');


const postCtrl = require('../controllers/post');

//Post
// POST
router.post('/', auth, postCtrl.createPost);
//GET
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:postId', auth, postCtrl.getOnePost);

//PUT
router.put('/:postId', auth, postCtrl.modifyPost);
//DELETE
router.delete('/:postId', auth, postCtrl.deletePost);


module.exports = router;