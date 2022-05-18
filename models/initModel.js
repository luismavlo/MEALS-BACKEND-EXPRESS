const Meal = require("./meal.model");
const Order = require("./order.model");
const Restaurant = require("./restaurant.model");
const Review = require("./review.model");
const User = require("./user.model")



const initModel = () => {

    //1 User <--------> M Order
    User.hasMany(Order);
    Order.belongsTo(User);

    //1 User <--------> M Review
    User.hasMany(Review);
    Review.belongsTo(User);

    //1 Restaurant <--------> M Review
    Restaurant.hasMany(Review);
    Review.belongsTo(Restaurant);

    //1 Restaurant <--------> M Meal
    Restaurant.hasMany(Meal)
    Meal.belongsTo(Restaurant)

    //1 Meals <--------> 1 Order
    Meal.hasOne(Order);
    Order.belongsTo(Meal);


}

module.exports = initModel