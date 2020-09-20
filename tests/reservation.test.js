// use the path of your model 
const Reservation = require('../models/reservation');
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

describe('Reservation Upload Testing', () => {
    // the code below is for insert testing  
    var id = '';
    it('Add Reservation', () => {
        const reservation = {
            'UserId': 'any',
            'tableImageName': 'any.jpg',
            'tableName': 'forTwo',
            'Price': '250',
            'Category': 'small',
            'FirstName': 'Any',
            'LastName': 'Any',
            'Email': 'Any',
            'Time': 'Any',
            'DateTable': 'Any',
            'Message': 'Any'
        };
        return Reservation.create(reservation)
            .then((reservation_res) => {
                id = reservation_res._id;
                expect(reservation_res.tableName).toEqual('forTwo');
            });
    });

    // // Table Delete Testing
    // it('testing Reservation Delete', async () => {
    //     const status = await
    //         Reservation.deleteMany({
    //             tableName: 'forTwo'
    //         });
    //     expect(status.ok).toBe(1);
    // });

});