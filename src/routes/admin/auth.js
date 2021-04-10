const express = require('express');
const { signup, signin } = require('../../controller/admin/authContoller');
const {
	validateSignUpRequest,
	validateSignInRequest,
	isRequestValidated,
} = require('../../validators/auth');

const router = express.Router();

router.post('/admin/signin', validateSignInRequest, isRequestValidated, signin);

router.post('/admin/signup', validateSignUpRequest, isRequestValidated, signup);

module.exports = router;
