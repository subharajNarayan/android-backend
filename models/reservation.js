const mongoose = require('mongoose');

//model of the application
const Reservation = mongoose.model('Reservation',{
    UserId:{
        type:String
    },
    tableImageName:{
        type:String
    },
    tableName:{
        type:String
    },
    Category:{
        type:String
    },
    Price:{
        type:String
    },
    FirstName:{
        type:String
    },
    LastName:{
        type:String
    },   
    Email:{
        type:String
    },
    Time:{
        type:String
    },   
    DateTable:{
        type:String
    },
    Message: {
        type: String
    }
});

module.exports = Reservation;