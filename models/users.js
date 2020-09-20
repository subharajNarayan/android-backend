const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

//model of the application
const userSchema = new mongoose.Schema({
    profilePicture: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    usertype: {
        type: String
    },
    password: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

//check credentials
userSchema.statics.checkCrediantialsDb = async (user22, pass) => {
    const user1 = await User.findOne({ email: user22, password: pass })
    return user1;
}
userSchema.statics.checkCrediantialsAndroid = async (email, password) => {
    const user2 = await User.findOne({ email: email, password: password })
    return user2;
}
//User.findOne({'email':email, 'password':password}).estimatedDocumentCount(function(err,number){
//generates token
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, "thisismynewcourse");

    user.tokens = user.tokens.concat({ token: token });
    await user.save();
    console.log("login initiated....")
    return token;
};

//generates token
const User = mongoose.model("User", userSchema);

module.exports = User;