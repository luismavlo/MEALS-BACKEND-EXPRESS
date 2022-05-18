const { Router } = require("express");
const { check } = require("express-validator");
const { signup, login, updateUser, deleteUser, getOrders, getOrderPerId } = require("../controllers/user.controller");
const { existEmail, isValidRole, existUser, validPassowrd, protectToken, protectAdmin, protectAccountOwner, existUserPerId, existOrderForUser } = require("../middlewares/user.middleware");
const { validateFields } = require("../middlewares/validate-fields");



const router = Router();


router.post('/signup', [
    check('name', 'the name is mandatory').not().isEmpty(),
    check('email', 'the email does not have a correct format').isEmail(),
    check('password', 'The password must have at least 8 characters').isLength({ min: 8 }),
    validateFields,
    existEmail,
    isValidRole
], signup)

router.post('/login', [
    check('email', 'the email does not have a correct format').isEmail(),
    check('password', 'The password must have at least 8 characters').isLength({ min: 8 }),
    validateFields,
    existUser,
    validPassowrd
], login)

router.use(protectToken);

router.patch('/:id', [
    check('name', 'the name is mandatory').not().isEmpty(),
    check('email', 'the email does not have a correct format').isEmail(),
    validateFields,
    existUserPerId,
    protectAccountOwner
], updateUser)

router.delete('/:id', existUserPerId, protectAccountOwner, deleteUser)

router.get('/orders', getOrders)

router.get('/orders/:id', existOrderForUser, getOrderPerId)

module.exports = {
    usersRouter: router
}