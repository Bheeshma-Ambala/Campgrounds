const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync')
const User = require('../models/user');
const passport = require('passport');
const users = require('../controllers/users.js');
const { storeReturnTo } = require('../middleware');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.Login)

router.get('/logout', users.logout);


module.exports = router;