const express = require('express');
const router = express.Router();
const ReviewController = require('./../controllers/ReviewController');
const authMiddleware = require('../middleware/authMiddleware');

// any user can view the reviews page, but only logged in users can create reviews. Otherwise, redirect to login page
router.get('/', ReviewController.getReviewsPage);

router.get('/create', authMiddleware.isLoggedIn, ReviewController.showReviewForm);

router.post('/create', authMiddleware.isLoggedIn, ReviewController.createReview);

// router.get('/tea/:teaId', ReviewController.getReviewsByTea);
// router.get('/stats/:teaId', ReviewController.getTeaStats);


module.exports = router;
