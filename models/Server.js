const express = require('express');
const cors = require('cors');


const { globalErrorHandler } = require('../controllers/error.controller');
const { db } = require('../database/config');
const { usersRouter } = require('../routes/user.routes');
const { restaurantRouter } = require('../routes/restaurant.routes');
const initModel = require('./initModel');
const { mealsRouter } = require('../routes/meal.routes');
const { orderRouter } = require('../routes/order.routes');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Path Routes
        this.paths = {
            user: '/api/v1/users',
            restaurant: '/api/v1/restaurants',
            meal: '/api/v1/meals',
            order: '/api/v1/orders'
        }


        //Connect to db
        this.database();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json())
    }

    routes() {
        this.app.use(this.paths.user, usersRouter);
        this.app.use(this.paths.restaurant, restaurantRouter);
        this.app.use(this.paths.meal, mealsRouter);
        this.app.use(this.paths.order, orderRouter)

        //GLOBAL ERROR
        this.app.use('*', globalErrorHandler);
    }

    database() {
        db.authenticate()
            .then(() => console.log('Database authenticated'))
            .catch(err => console.log(err));

        //relations
        initModel();

        db.sync()
            .then(() => console.log('Database synced'))
            .catch(err => console.log(err));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriento en puerto', this.port)
        })
    }

}

module.exports = Server