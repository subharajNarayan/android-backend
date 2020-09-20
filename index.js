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

app.delete('/delete-user/:id', function (req, res) {
    User.findByIdAndDelete(req.params.id).then(function () {
    }).catch(function () {
    })
});

app.delete('/delete-dish/:id', function (req, res) {
    Menu.findByIdAndDelete(req.params.id).then(function () {
    }).catch(function () {
    })
});


app.delete('/delete-table/:id', function (req, res) {
    Table.findByIdAndDelete(req.params.id).then(function () {
    }).catch(function () {
    })
});

app.delete('/delete-order/:id', function (req, res) {
    FoodOrder.findByIdAndDelete(req.params.id).then(function () {
    }).catch(function () {
    })
});
app.delete('/delete-reservation/:id', function (req, res) {
    Reservation.findByIdAndDelete(req.params.id).then(function () {
    }).catch(function () {
    })
});
app.delete('/delete-review/:id', function (req, res) {
    Review.findByIdAndDelete(req.params.id).then(function () {
    }).catch(function () {
    })
});
app.get('/getDishById/:id', function (req, res) {
    const id = req.params.id.toString();
    console.log(id);
    Menu.findById(id)
        .then(function (menu) {
            console.log(menu);
            res.status(201).json(menu);
        })
        .catch(function (e) {
            res.status(500).json({ message: e });
        });
});

app.put('/updatingDish/:id', function (req, res) {
    const id = req.params.id.toString();
    Menu.findByIdAndUpdate(id, req.body, { new: true })
        .then(function (menu) {
            console.log(menu);
            res.status(201).json({
                message: "The Product was Updated successfully"
            });
        }).catch(function (err) {
            console.log(err);
            res.status(500).json({
                message: err
            });
        })
});
app.get('/getTableById/:id', function (req, res) {
    const id = req.params.id.toString();
    console.log(id);
    Table.findById(id)
        .then(function (table) {
            console.log(table);
            res.status(201).json(table);
        })
        .catch(function (e) {
            res.status(500).json({ message: e });
        });
});

app.put('/updatingTable/:id', function (req, res) {
    const id = req.params.id.toString();
    Table.findByIdAndUpdate(id, req.body, { new: true })
        .then(function (table) {
            console.log(table);
            res.status(201).json({
                message: "The Product was Updated successfully"
            });
        }).catch(function (err) {
            console.log(err);
            res.status(500).json({
                message: err
            });
        })
});

app.post('/bookTable', auth, function (req, res) {
    var reserveData = new Reservation({ ...req.body, userId: req.user._id });
    reserveData.save().then(function () {
        res.send('Table Reserved Successfully');
    }).catch(function (e) {

    });
    console.log(req.body);
});
app.post('/orderFood', auth, function (req, res) {
    var orderedFood = new FoodOrder({ ...req.body, userId: req.user._id });
    orderedFood.save().then(function () {
        res.send('Food Ordered Successfully');
    }).catch(function (e) {

    });
    console.log(req.body);
});

app.post('/userReview', auth, function (req, res) {
    var review = new Review({ ...req.body, userId: req.user._id });
    review.save().then(function () {
        res.send('Review Added Successfully');
    }).catch(function (e) {

    });
    console.log(req.body);
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
    }
});

app.get('/users/me', auth, function (req, res) {
    res.send(req.user);
});

// Start of image upload for Profile Picture

var storageProfile = multer.diskStorage({
    destination: "public/profile_picture",
    filename: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        callback(null, "profile" + Date.now() + ext);
    }
});
var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
};

var uploadProfile = multer({
    storage: storageProfile,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 10000000
    }
});

app.post('/uploadProfilePicture', uploadProfile.single('imageFile'), (req, res) => {
    console.log('here')
    res.send(req.file)
    console.log(req.file)
})

//End of image upload for Profile 


// Start of image upload for Dish

var storage = multer.diskStorage({
    destination: "public/menu_images",
    filename: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        callback(null, "dish" + Date.now() + ext);
    }
});
var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
};

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 10000000
    }
});

app.post('/uploadDishImage', upload.single('imageFile'), (req, res) => {
    console.log('here')
    res.send(req.file)
    console.log(req.file)
})

//End of image upload for Dish 

// Start of image upload for Table
var storageTable = multer.diskStorage({
    destination: "public/table_images",
    filename: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        callback(null, "table" + Date.now() + ext);
    }
});
var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
};

var uploadTable = multer({
    storage: storageTable,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 10000000
    }
});

app.post('/uploadTableImage', uploadTable.single('imageFile'), (req, res) => {
    console.log('here')
    res.send(req.file)
    console.log(req.file)
})
//  End of image upload for Table   

app.post('/users/logout', auth, async (req, res) => {
    try {
        //console.log( req.user.tokens);
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send(token)
    } catch (e) {
        res.status(500).send()
    }
});

//update user
app.put('/updateprofile', auth, function (req, res) {
    console.log(req.body);
    User.findByIdAndUpdate(req.user._id, req.body, { new: true }, (err, user) => {
        res.send("succesfull");
    });
});

app.post('/loginAndroid', function (req, res) {


    var email = req.body.Email;
    var password = req.body.Password;

    User.findOne({ 'email': email, 'password': password }).estimatedDocumentCount(function (err, number) {
        if (number != 0) {
            console.log(req.body);
            const token = generatetoken();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json("Login successfull");
            console.log(token);
        }
        else {
            res.send('Email and password mismatch');
            console.log('Email and password mismatch');
        }
    })
})
app.post("/userLoginAndroid", async function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    const user = await User.checkCrediantialsAndroid(email, password);
    if (user != null) {
        console.log(req.body);
        const token = await user.generateAuthToken()
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({
            token: token,
            users: user,
            message: "Login successful"
        });
        console.log(token);
    }
    else {
        res.send('Email and password mismatch');
        console.log('Email and password mismatch');
    }
});

function generatetoken() {
    const token = jwt.sign({ _id: "userid" }, "mysecretworld")
    console.log(token);
}

app.listen(3000);
