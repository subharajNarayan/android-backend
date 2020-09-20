const mongoose = require('mongoose');

//model of the application
const Review = mongoose.model('Review',{
    UserId:{
        type:String
    },
    profilePicture:{
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
    DateReview:{
        type:String
    },
    Rating:{
        type:String
    },
    Message: {
        type: String
    }
});

module.exports = Review;