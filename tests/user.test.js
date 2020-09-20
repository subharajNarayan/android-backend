// use the path of your model 
const User = require('../models/users');
const mongoose = require('mongoose');
// use the new name of the database 
const url = 'mongodb://localhost:27017/ApplicationTesting';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {

    await mongoose.connection.close();
});

describe('User Upload Testing', () => {
    // the code below is for insert testing  
    var id = '';
    it('Add User', () => {
        const user = {
            'profilePicture': 'any.jpg',
            'firstname': 'Nikhil',
            'lastname': 'kapali',
            'address': 'yetkha',
            'phone': '9865',
            'email': 'any@gmail.com',
            'usertype': 'User',
            'password': 'Any'
        };
        return User.create(user)
            .then((user_res) => {
                id = user_res._id;

                expect(user_res.firstname).toEqual('Nikhil');
            });
    });

    //Update User

    it('updateuser testing', () => {
        const userupdate = {
            firstname: 'Rajib Shrestha'
        }
        console.log(id)
        return User.findByIdAndUpdate(id, userupdate, {
            new: true
        }).then((userupdate) => {
            expect(userupdate.firstname).toEqual('Rajib Shrestha');
        });
    });

    // User Delete Testing
    it('testing User Delete', async () => {
        const status = await
            User.deleteMany({
                firstname: 'Rajib Shrestha'
            });
        expect(status.ok).toBe(1);
    });

});