// use the path of your model 
const Dish = require('../models/dish');
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

describe('Dish Upload Testing', () => {
    // the code below is for insert testing  
    var id = '';
    it('Add Dish', () => {
        const dish = {
            'dishImageName': 'any.jpg',
            'dishName': 'Burger',
            'Price': 'Any',
            'Category': 'Any'
        };
        return Dish.create(dish)
            .then((dish_res) => {
                id = dish_res._id;

                expect(dish_res.dishName).toEqual('Burger');
            });
    });

    //Update Dish

    it('Update Dish testing', () => {
        const dishupdate = {
            dishName: 'Ham Burger'
        }
        console.log(id)
        return Dish.findByIdAndUpdate(id, dishupdate, {
            new: true
        }).then((dishupdate) => {
            expect(dishupdate.dishName).toEqual('Ham Burger');
        });
    });

    // Dish Delete Testing
    it('testing Dish Delete', async () => {
        const status = await
            Dish.deleteMany({
                dishName: 'Burger'
            });
        expect(status.ok).toBe(1);
    });
});