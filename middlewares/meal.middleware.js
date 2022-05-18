const { response } = require("express");
const { AppError } = require("../helpers/appError");
const { catchAsync } = require("../helpers/catchAsync");
const Meal = require("../models/meal.model");
const Restaurant = require("../models/restaurant.model");

const existMeal = catchAsync(async (req, res = response, next) => {

    const { id } = req.params;

    const meal = await Meal.findOne({
        where: {
            id,
            status: true
        }, attributes: { exclude: ['status'] },
        include: [{
            model: Restaurant, attributes: {
                exclude: ['status']
            }
        }]
    })

    if (!meal) {
        return next(new AppError('The meal is not found', 404))
    }

    req.meal = meal;

    next();
})


module.exports = {
    existMeal
}