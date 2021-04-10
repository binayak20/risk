const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const multer = require('multer');
const { addProduct } = require('../controller/productController');
const router = express.Router();
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(path.dirname(__dirname), 'uploads'));
	},
	filename: function (req, file, cb) {
		cb(null, shortid.generate() + '-' + file.originalname);
	},
});
const upload = multer({ storage });

router.post(
	'/product/create',
	requireSignin,
	adminMiddleware,
	upload.array('productPicture'),
	addProduct
);
//router.get('/product/getProduct', fetchProduct);
//router.post('/signup', validateSignUpRequest, isRequestValidated, signup);

module.exports = router;
