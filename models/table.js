const mongoose = require('mongoose');


//model of the application
const Table = mongoose.model('Table',{
    tableImageName:{
        type:String
    },
    tableName:{
        type:String
    },
    Category:{
        type:String
    },
    Price: {
        type: String
    }
});

module.exports = Table;