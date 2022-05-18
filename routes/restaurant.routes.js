const { Router } = require("express");
const { check } = require("express-validator");
const { createRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant, createReview, updateReview, deleteReview } = require("../controllers/restaurant.controller");
const { isValidRating, existRestaurantById, existRestaurantByRestId, existReview } = require("../middlewares/restaurant.middleware");
const { protectToken, protectAdmin, protectAccountOwner } = require("../middlewares/user.middleware");
const { validateFields } = require("../middlewares/validate-fields");


const router = Router();

router.get('/', getAllRestaurants)

router.get('/:id', existRestaurantById, getRestaurantById)

router.use(protectToken);

router.post('/', [
    check('name', 'The name is mandatory').not().isEmpty(),
    check('address', 'The address is mandatory').not().isEmpty(),
    validateFields,
    isValidRating,
    protectAdmin
], createRestaurant)


router.patch('/:id', [
    check('name', 'The name is mandatory').not().isEmpty(),
    check('address', 'The address is mandatory').not().isEmpty(),
    validateFields,
    existRestaurantById,
    protectAdmin
], updateRestaurant)

router.delete('/:id', existRestaurantById, protectAdmin, deleteRestaurant)

/* reviews */

router.post('/reviews/:id', [
    check('comment', 'The comment is mandatory').not().isEmpty(),
    validateFields,
    isValidRating,
    existRestaurantById
], createReview)

router.patch('/reviews/:restaurantId/:id', [
    check('comment', 'The comment is mandatory').not().isEmpty(),
    validateFields,
    isValidRating,
    existRestaurantByRestId,
    existReview,
    protectAccountOwner
], updateReview)

router.delete('/reviews/:restaurantId/:id',
    existRestaurantByRestId,
    existReview,
    protectAccountOwner,
    deleteReview)

module.exports = {
    restaurantRouter: router
}