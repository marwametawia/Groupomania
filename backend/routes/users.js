const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const userCtrl = require('../controllers/users');
const multer = require('../middleware/multer-config');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);


router.get('/:id', auth, userCtrl.getUserProfile);
// PUT
router.put('/:id', auth, multer, userCtrl.modifyUserProfile);
// DELETE
router.delete('/:id', auth, userCtrl.deleteAccount);


module.exports = router;