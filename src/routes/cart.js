const express = require('express');
const { requireSignin, userMiddleware } = require('../common-middleware');

const { addItemToCart } = require('../controller/cartController');
const router = express.Router();

router.post(
	'/user/cart/addtocart',
	requireSignin,
	userMiddleware,
	addItemToCart
);
//router.get('/category/getCategory', fetchCategory);
//router.post('/signup', validateSignUpRequest, isRequestValidated, signup);

module.exports = router;
