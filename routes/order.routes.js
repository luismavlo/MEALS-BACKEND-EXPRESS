const { Router } = require("express");
const { check } = require("express-validator");
const { createOrder, getOrdersUser, updateOrder, deleteOrder } = require("../controllers/order.controller");
const { existMealForOrder, existOrder } = require("../middlewares/order.middleware");
const { protectToken, protectAdmin, protectAccountOwner } = require("../middlewares/user.middleware");

const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.use(protectToken)

router.post('/', [
    check('quantity', 'the quantity is mandatory').not().isEmpty(),
    check('quantity', 'the quantity must be a number').not().isString(),
    check('mealId', 'the mealId is mandatory').not().isEmpty(),
    check('mealId', 'the mealId must be a number').not().isString(),
    validateFields,
    existMealForOrder
], createOrder)

router.get('/me', getOrdersUser)

router.patch('/:id', existOrder, protectAccountOwner, updateOrder)

router.delete('/:id', existOrder, protectAccountOwner, deleteOrder)


module.exports = {
    orderRouter: router
}