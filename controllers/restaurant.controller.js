const { response } = require("express")

const { catchAsync } = require("../helpers/catchAsync")
const Restaurant = require("../models/restaurant.model");
const Review = require("../models/review.model");
const User = require("../models/user.model");


const createRestaurant = catchAsync(async (req, res = response, next) => {

    const { name, address, rating } = req.body;

    const restaurant = new Restaurant({ name, address, rating });

    await restaurant.save();

    res.status(201).json({
        status: 'success'
    })

})


const getAllRestaurants = catchAsync(async (req, res = response, next) => {

    const restaurants = await Restaurant.findAll({
        where: { status: true },
        attributes: { exclude: ['status'] },
        include: [{
            model: Review, attributes: {
                exclude: ['status', 'restaurantId', 'userId']
            }, include: [{
                model: User, attributes: {
                    exclude: ['password', 'role', 'status']
                }
            }]
        }]
    });

    res.status(200).json({
        restaurants
    })

})


const getRestaurantById = catchAsync(async (req, res = response, next) => {

    const { restaurant } = req;

    res.status(200).json({
        restaurant
    })

})


const updateRestaurant = catchAsync(async (req, res = response, next) => {

    const { name, address } = req.body

    const { restaurant } = req;

    await restaurant.update({ name, address })

    res.status(200).json({
        status: 'success'
    })

})


const deleteRestaurant = catchAsync(async (req, res = response, next) => {

    const { restaurant } = req;

    await restaurant.update({ status: false })

    res.status(200).json({
        status: 'success'
    })
})


const createReview = catchAsync(async (req, res = response, next) => {

    const { comment, rating } = req.body;

    const restaurantId = +req.params.id;

    const userId = req.sessionUser.id;

    const review = new Review({ userId, comment, restaurantId, rating });

    await review.save();

    res.status(201).json({
        status: 'success'
    })

})


const updateReview = catchAsync(async (req, res = response, next) => {

    const { review } = req;

    const { comment, rating } = req.body;

    await review.update({
        comment,
        rating
    });


    res.status(200).json({
        status: 'success'
    });
})


const deleteReview = catchAsync(async (req, res = response, next) => {

    const { review } = req;

    await review.update({
        status: false
    })

    res.status(200).json({
        status: 'success'
    })

})

module.exports = {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    createReview,
    updateReview,
    deleteReview
}