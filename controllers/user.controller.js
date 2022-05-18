const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { catchAsync } = require("../helpers/catchAsync");
const { generateJWT } = require("../helpers/jwt");
const User = require('../models/user.model');
const Order = require('../models/order.model');



const signup = catchAsync(async (req, res = response, next) => {

    const { name, email, password, role } = req.user;

    const user = new User({ name, email, password, role });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    const token = await generateJWT(user.id);

    res.status(201).json({
        status: 'success',
        uid: user.id,
        token
    })
});

const login = catchAsync(async (req, res = response, next) => {

    const { user } = req;

    const token = await generateJWT(user.id);

    res.json({
        status: 'success',
        token,
        user: {
            name: user.name,
            uid: user.id
        }
    })
});

const updateUser = catchAsync(async (req, res = response, next) => {

    const { name, email } = req.body

    const { user } = req;

    await user.update({ name, email });

    res.status(201).json({
        status: 'success'
    })
});

const deleteUser = catchAsync(async (req, res = response, next) => {

    const { user } = req;

    await user.update({ status: false })

    res.json({
        status: 'success'
    })
});

const getOrders = catchAsync(async (req, res = response, next) => {

    const { sessionUser } = req;

    const orders = await Order.findAll({
        where: {
            userId: sessionUser.id
        }
    })

    res.json({
        status: 'success',
        orders
    })
});

const getOrderPerId = catchAsync(async (req, res = response, next) => {

    const { order } = req;

    res.json({
        ok: true,
        order
    })
})

module.exports = {
    signup,
    login,
    updateUser,
    deleteUser,
    getOrders,
    getOrderPerId
}