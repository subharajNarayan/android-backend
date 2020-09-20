## Restaurant api
Name: Subharaj Narayan Chaudhary

CollegeID: 160477
Batch: 23 'A'

Brief description of the domain of your project!

## List of Main Features
- The application will have a separate login and register for the user.
- The User can order food online.
- The User can reserve tables online as well.
- The User can update his own personal profile or details.
- The Admin can view, update, delete and add the required tables and dishes as well as delete Users of the system.

## API Documentation
List out your main APIs and its sample input and output!
For this project I have used NodeJS, Mongo db, moongoose and express for the developement of the system. The main work of the Api is to retrive, post, update and delete the required data. The sample codes and dependencies are as follows.

  "dependencies": {
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "jest": "^24.8.0",
    "jsonwebtoken": "^8.5.1",
    "mongodb": "^3.2.7",
    "mongoose": "^5.6.1",
    "multer": "^1.4.1",
    "nodemon": "^1.19.1",
    "path": "^0.12.7"
  },

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');

require('./db/database');
const User = require('./models/users.js');
const Menu = require('./models/dish.js');
const Table = require('./models/table.js');
const Reservation = require('./models/reservation.js');
const auth = require('./middleware/auth');
const FoodOrder = require('./models/order');
const Review = require('./models/review');
const middleware = require('./middleware/middleware');

app.use('/images', express.static('./public/menu_images'));
app.use('/imageTable', express.static('./public/table_images'));
app.use('/imageProfile', express.static('./public/profile_picture'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post("/userUpload", async function (req, res) {
    const myData = new User({
        profilePicture: req.body.profilePicture,
        firstname: req.body.FirstName,
        lastname: req.body.LastName,
        address: req.body.Address,
        phone: req.body.PhNumber,
        email: req.body.Email,
        usertype: req.body.Usertype,
        password: req.body.Password

    });
    myData.save()
        .then(function () {
            console.log(req.body);
            res.status(201).json({
                message: "Registered Successfully"
            })
        }).catch(function (e) {
            res.status(500).json({
                message: "ERROR"
            })
        });
});

app.post("/addDish", function (req, res) {
    var dishimagename = req.body.dishImageName;
    var dishname = req.body.dishName;
    var category = req.body.Category;
    var price = req.body.Price;
    var data = new Menu({
        'dishImageName': dishimagename,
        'dishName': dishname,
        'Category': category,
        'Price': price
    });
    data.save().then(function () {
        res.send(data);
    }).catch(function (e) {
        res.send(e);
    });
});

app.post("/addTable", function (req, res) {
    var tableImageName = req.body.tableImageName;
    var tableName = req.body.tableName;
    var Category = req.body.Category;
    var Price = req.body.Price;
    var data = new Table({
        'tableImageName': tableImageName,
        'tableName': tableName,
        'Category': Category,
        'Price': Price
    });
    data.save().then(function () {
        window.reload();
    }).catch(function (e) {
        res.send(e);
    });
    console.log(req.body);
});

app.get('/getMenu', function (req, res) {
    Menu.find().then(function (menu) {
        var itemsData = JSON.stringify(menu);
        //console.log(itemsData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(itemsData);
        //res.send(menu);
    }).catch(function (e) {
        res.send(e)
    });
});

app.get('/getTable', function (req, res) {
    Table.find().then(function (table) {
        res.send(table);
    }).catch(function (e) {
        res.send(e)
    });
});
app.get('/getReview', function (req, res) {
    Review.find().then(function (review) {
        res.send(review);
    }).catch(function (e) {
        res.send(e)
    });
});

app.get('/getUserForAdmin', function (req, res) {
    User.find().then(function (user) {
        res.send(user);
    }).catch(function (e) {
        res.send(e)
    });
});

// show order
app.get('/showOrderList', function (req, res) {
    FoodOrder.find().then(function (foodOrder) {
        var itemsData = JSON.stringify(foodOrder);
        //console.log(itemsData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(itemsData);
        //res.send(menu);
    }).catch(function (e) {
        res.send(e)
    });
});
//show Reservation
app.get('/showReservationList', function (req, res) {
    Reservation.find().then(function (reservation) {
        var itemsData = JSON.stringify(reservation);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(itemsData);
    }).catch(function (e) {
        res.send(e)
    });
});

app.post("/userLogin", async function (req, res) {

    const user = await User.checkCrediantialsDb(req.body.Email, req.body.Password);
    if (user) {
        console.log(req.body);
        const token = await user.generateAuthToken()
        res.status(201).json({
            token: token,
            user: user,
            id: user._id,
            firstname: user.FirstName,
            lastname: user.LastName,
            address: user.Address,
            phone: user.PhNumber,
            email: user.Email,
            usertype: user.Usertype,
            password: user.Password
        });
        console.log(token);
    }
    else {
        res.send('Email and password mismatch');
        console.log('Email and password mismatch');
    }<!--  -->
});

app.get('/users/me', auth, function (req, res) {
    res.send(req.user);
});