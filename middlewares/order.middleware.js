const { response } = require("express");
const { AppError } = require("../helpers/appError");
const { catchAsync } = require("../helpers/catchAsync");
const Meal = require("../models/meal.model");
const Order = require("../models/order.model");
const Restaurant = require("../models/restaurant.model");
const User = require("../models/user.model");


const existOrder = catchAsync(async (req, res = response, next) => {

    const { id } = req.params;

    const order = await Order.findOne({
        where: {
            id,
            status: 'active'
        }, attributes: { exclude: ['status'] },
        include: [{
            model: Meal, attributes: {
                exclude:
                    ['status'], include: [{
                        model: Restaurant, attributes: {
                            exclude: ['status']
                        }
                    }]
            }
        }],
        include: [{
            model: User, attributes: {
                exclude:
                    ['password', 'status', 'role']
            }
        }]
    })


    if (!order) {
        return next(new AppError('Ordet not found', 404));
    }

    req.order = order;
    req.user = order.user

    next();
})

const existMealForOrder = catchAsync(async (req, res = response, next) => {

    const { mealId } = req.body;

    const meal = await Meal.findOne({
        where: {
            id: mealId,
            status: true
        }
    })

    if (!meal) {
        return next(new AppError('Meal not found', 404));
    }

    req.meal = meal;
    next()
});



module.exports = {
    existOrder,
    existMealForOrder
}