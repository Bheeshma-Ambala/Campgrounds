const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js')
const Campground = require('../models/campground');
const Review = require('../models/review.js')

const ExpressError = require('../utilities/ExpressError');
const catchAsync = require('../utilities/catchAsync');
const reviews = require('../controllers/reviews.js');


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;