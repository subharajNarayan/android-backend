// use the path of your model 
const Order = require('../models/order');
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

describe('Order Upload Testing', () => {
    // the code below is for insert testing  
    var id = '';
    it('Add Order', () => {
        const order = {
            'UserId': 'Any',
            'dishImageName': 'any.jpg',
            'dishName': 'Burger',
            'Price': 'Any',
            'Category': 'Any',
            'FirstName': 'Any',
            'LastName': 'Any',
            'Email': 'Any',
            'Message': 'Any',
            'Payment': 'Any'
        };
        return Order.create(order)
            .then((order_res) => {
                id = order_res._id;

                expect(order_res.dishName).toEqual('Burger');
            });
    });

    // //  Order Delete Testing
    // it('testing Dish Delete', async () => {
    //     const status = await
    //         Order.deleteMany({
    //             dishName: 'Burger'
    //         });
    //     expect(status.ok).toBe(1);
    // });
});