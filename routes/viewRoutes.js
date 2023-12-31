const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsController.getOverview,
);
router.get('/tours/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLogin);
router.get('/signup', authController.isLoggedIn, viewsController.getSignUp);
router.get('/me', authController.protect, viewsController.getAccount);
router.get(
  '/manage-tours',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.manageTours,
);
router.get(
  '/manage-users',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.manageUsers,
);
router.get('/my-tours', authController.protect, viewsController.getMyTours);
router.get(
  '/favourite-tours',
  authController.protect,
  viewsController.getLikedTours,
);
router.get('/my-reviews', authController.protect, viewsController.getMyReviews);
router.get(
  '/verification/:string',
  authController.verification,
  viewsController.getVerification,
);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData,
);

// /login route

module.exports = router;
