const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');
const reviewRouter = require('./../routes/reviewRoutes');
const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/monthly-plan/:year').get(authController.funk, authController.restrictTo('admin', 'lead-guide', 'guide'), tourController.getMonthlyPlan);

router.route('/tour-stats').get(tourController.getTourStats);

router.route('/').get(tourController.getAllTours).post(authController.funk, authController.restrictTo('admin', 'lead-guide'), tourController.createTour);

router.route('/:id').get(tourController.getTour)
    .patch(authController.funk, authController.restrictTo('admin', 'lead-guide'), tourController.uploadTourImages, tourController.resizeTourImages, tourController.updateTour)
    .delete(authController.funk, authController.restrictTo('admin', 'lead-guide'), tourController.deleteTour);

// router.route('/:tourId/reviews')
// .post(authController.protect,authController.restrictTo('user'),reviewController.createReview);
module.exports = router;
