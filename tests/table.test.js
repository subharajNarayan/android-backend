// use the path of your model 
const Table = require('../models/table');
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

describe('Table Upload Testing', () => {
    // the code below is for insert testing  
    var id = '';
    it('Add Table', () => {
        const table = {
            'tableImageName': 'any.jpg',
            'tableName': 'forTwo',
            'Price': '250',
            'Category': 'small',
        };
        return Table.create(table)
            .then((table_res) => {
                id = table_res._id;

                expect(table_res.tableName).toEqual('forTwo');
            });
    });

    //Update Table

    it('Update Table testing', () => {
        const tableupdate = {
            tableName: 'ForTwoPeople'
        }
        console.log(id)
        return Table.findByIdAndUpdate(id, tableupdate, {
            new: true
        }).then((tableupdate) => {
            expect(tableupdate.tableName).toEqual('ForTwoPeople');
        });
    });

    // Table Delete Testing
    it('testing Table Delete', async () => {
        const status = await
            Table.deleteMany({
                tableName: 'forTwo'
            });
        expect(status.ok).toBe(1);
    });

});