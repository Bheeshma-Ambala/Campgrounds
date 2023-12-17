const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');

const campgrounds = require('../controllers/campgrounds');

const { isLoggedIn, validateCampground, isAuthor } = require('../middleware.js')

const Campground = require('../models/campground.js')
const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createNewForm))
// .post(upload.array('image'), (req, res) => {
//     console.log(req.body, req.files);
//     res.send('worked')
// })

router.get('/new', isLoggedIn, campgrounds.renderNewForm);


router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.UpdateCampgrounds))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));




module.exports = router;