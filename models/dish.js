const mongoose = require('mongoose');


//model of the application
const Menu = mongoose.model('Menu',{
    dishImageName:{
        type:String
    },
    dishName:{
        type:String
    },
    Category:{
        type:String
    },
    Price: {
        type: String
    }
});

module.exports = Menu;