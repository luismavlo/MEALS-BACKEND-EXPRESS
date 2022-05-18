const { response } = require("express");
const { catchAsync } = require("../helpers/catchAsync");
const Meal = require("../models/meal.model");
const Restaurant = require("../models/restaurant.model");


const getMeals = catchAsync(async (req, res = response, next) => {

    const meals = await Meal.findAll({
        where: {
            status: true
        }, attributes: { exclude: ['status'] },
        include: [{
            model: Restaurant, attributes: {
                exclude: ['status']
            }
        }]
    })

    res.json({
        status: 'success',
        meals
    })
});
const getMealById = catchAsync(async (req, res = response, next) => {

    const { meal } = req;

    res.json({
        status: 'success',
        meal
    })
});
const createMeal = catchAsync(async (req, res = response, next) => {

    const { name, price } = req.body;

    const restaurantId = req.restaurant.id;

    const meal = new Meal({ name, price, restaurantId })

    await meal.save();

    res.status(201).json({
        status: 'success'
    })
});
const updateMeal = catchAsync(async (req, res = response, next) => {

    const { name, price } = req.body;

    const { meal } = req;

    await meal.update({ name, price })

    res.json({
        status: 'success'
    })
});
const deleteMeal = catchAsync(async (req, res = response, next) => {

    const { meal } = req;

    await meal.update({ status: false })

    res.status(200).json({
        status: 'success'
    })
});


module.exports = {
    getMeals,
    getMealById,
    createMeal,
    updateMeal,
    deleteMeal
}