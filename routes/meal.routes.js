const { Router } = require("express");
const { check } = require("express-validator");
const { getMeals, getMealById, createMeal, updateMeal, deleteMeal } = require("../controllers/meal.controller");
const { existMeal } = require("../middlewares/meal.middleware");
const { existRestaurantById } = require("../middlewares/restaurant.middleware");
const { protectToken, protectAdmin } = require("../middlewares/user.middleware");


const { validateFields } = require("../middlewares/validate-fields");

const router = Router();


router.get('/', getMeals);

router.get('/:id', existMeal, getMealById);

router.use(protectToken, protectAdmin)

router.post('/:id', [
    check('name', 'the name is mandatory').not().isEmpty(),
    check('price', 'the price is mandatory').not().isEmpty(),
    check('price', 'the price must be a number').not().isString(),
    validateFields,
    existRestaurantById
], createMeal);

router.patch('/:id', [
    check('name', 'the name is mandatory').not().isEmpty(),
    check('price', 'the price is mandatory').not().isEmpty(),
    check('price', 'the price must be a number').not().isString(),
    validateFields,
    existMeal
], updateMeal);

router.delete('/:id', existMeal, deleteMeal);


module.exports = {
    mealsRouter: router
}