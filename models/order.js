const mongoose = require('mongoose');

//model of the application
const FoodOrder = mongoose.model('FoodOrder', {
    UserId: {
        type: String
    },
    dishImageName: {
        type: String
    },
    dishName: {
        type: String
    },
    Category: {
        type: String
    },
    Price: {
        type: String
    },
    FirstName: {
        type: String
    },
    LastName: {
        type: String
    },
    Email: {
        type: String
    },
    Address: {
        type: String
    },
    Message: {
        type: String
    },
    Payment: {
        type: String
    }
});

module.exports = FoodOrder;