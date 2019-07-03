const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/users');

const storage = multer.diskStorage({
	destination: function(req,file,cb) {
       cb(null,"./uploads/");
	},
	filename: function(req,file,cb) {
		cb(null,new Date().toISOString()+file.originalname);
	}
});
const fileFilter = (req,file,cb) => {
	if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
		cb(null,true);
	}else {
		cb(null,false);
	}
};
const upload = multer({storage:storage,fileFilter:fileFilter});


/* GET users listing. */
router.get('/', userController.index);
// CREATE A NEW USER
router.post('/', userController.create);
// AUTHENTICATE USER
router.post('/signin', userController.authenticateUser);
// FIND USER BY ID
router.get('/:userID', userController.findUser);
// UPdate user by id
router.patch('/:userID', userController.updateUser);
// Events created by a User
// Invites received for that userid
router.put('/upload/:ID',upload.single('image'),userController.uploadImage)
router.get('/:userID/invites', userController.invites);

module.exports = router;
