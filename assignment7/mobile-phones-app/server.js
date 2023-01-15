// This is the server to be run to access my mongoDB atlas database and perform RESTful for the frontend operations.
// Code developed and tested on MACOS using postman for testing and safari browser for the frontend.
// Once the  server.js file is run, we can see the frontend at the url: http://localhost:3000/
const express = require('express');         // making an ExpressJS App
const bodyParser = require('body-parser');  // use body-parser extensively

const app = express();                      // create the ExpressJS app

/*  == USER INTERFACE ADDITIONS == */
const hbs = require('hbs');
const path = require('path');
/*  == USER INTERFACE ADDITIONS == */

// parse the different kinds of requests (content-type) the app handles
// use the "use" method to set up the body-parser middlewear
app.use(bodyParser.json())                          //  application/json
app.use(bodyParser.urlencoded({ extended: true }))  // pplication/x-www-form-urlencoded

/*  == USER INTERFACE ADDITIONS == */
app.set('views',path.join(__dirname,'views')); // set the views directory
app.set('view engine', 'hbs'); // set the view engine to hbs
app.use('/assets',express.static(__dirname + '/public')); // set public folder as "static" fo
/*  == USER INTERFACE ADDITIONS == */



// Set up Mongoose and our Database connection
const dbConnect = require('./config/connect.js');
const mongoose = require('mongoose');

// Set up connection to the database
mongoose.connect(dbConnect.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the MongoDB database");    
}).catch(err => {
    console.log('Unable to connect to the MongoDB database', err);
    process.exit();
});

// Adding here the depencies to the RESTful routes for customers, phones and orders. 
require('./app/routes/customer.routes.js')(app);
require('./app/routes/phone.routes.js')(app);
require('./app/routes/order.routes.js')(app);


// listen for requests on port 3000
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});


// App DESCRIPTION
// The mongoDB atlas database that I am using is the same I used for Assignment 5. It already has some data in it.

// DATABASE DESIGN SPECIFICATION
// My data modeling approach for the design of this database consists of 3 different collections.
// - Customers collection: contains all customer data, including the home address and the shipping address fields embedded in the collection.
//    In this way when performing a search for a given customer, his/her data together with all the address information
//    is retrieved with one sole query, thus saving time.
// - Phones collection: contains the phones data. An ID is assigned automatically to each document isnerted.
// - Orders collection: this collection if formed by documents with a Customer and a Phones field. Both fields are 
//    references to fields in the other collections, i.e., each customer is a customerID referencing a customer in the Customers 
//    collection, and each phone in the Phones array field is also a PhoneID referencing a phone in the Phones collection. 
//    In this way we can keep track of all orders in a separate table but still establish relations between customers and phones.

// My RESTful API provides CRUD functionality for Creating, Searching (Retrieving), Updating, and Deleting customer, phone, and order information from a MongoDB database.
// The routes implemented and tested using Postman are:
//  - GET -> http://localhost:3000/customers -> will return all the customers in the database.
//  - GET -> http://localhost:3000/customers/:customerId -> will return all the specific customer.
//  - POST -> http://localhost:3000/customers -> will add a customer. Need to specify the parameters for the customer in JSON. As an example, I added:
/*      {
        "home_address": {
            "address_line_1": "55 Elmsville Green",
            "address_line_2": "Loks",
            "town": "Blackrock",
            "county": "Co. Cork",
            "EIRCODE": "T16 Z7C9"
        },
        "shipping_address": {
            "address_line_1": "55 Elmsville Green",
            "address_line_2": "Loks",
            "town": "Blackrock",
            "county": "Co. Cork",
            "EIRCODE": "T16 Z7C9"
        },
        "_id": "6259530e37f888e884dddedd",
        "title": "Mx",
        "firstName": "John",
        "surname": "Doe",
        "mobile": 8987777,
        "email": "JohnNewMail@gmail.com"
        }
*/
//  - PUT -> http://localhost:3000/customers/:customerId -> will update the specified details passed in JSON of a given customer.
//  - PUT -> http://localhost:3000/customers/name/:customerId -> will update only the firtsName of the specifc customer.
//  - DELETE -> http://localhost:3000/customers/:customerId -> will delete the specifc customer from the collection.

// The routes are the same for the 'phones' and 'orders' database (changing 'customers' by 'phones' or 'orders on the route')

// Furthermore, for Assignment 7, there  is a frontend implemented in order to execute this RESTful ops. 
// It provides links to access the different databases.
// All code isr referenced from John Keating's lectures and material.
