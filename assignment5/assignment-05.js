
//
// CRUD functionality for mobile phone database.
// Developed with mongodb Atlas. See database connection details in file atlas_connect.js 
// IP address 0.0.0.0 has been whitelisted for access.
// Developed on MacOs.
//
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const connect = require("./atlas_connect"); // url from connect module
const client = new MongoClient(connect.database.url, { useUnifiedTopology: true } );

// database name
const dbName = 'mobilePhoneDB';

// Use connect method to connect to the server
client.connect(function(err) {
  // using the assert module for testing
  assert.equal(null, err);
  console.log("Connected successfully to server");

  // use this database
  const db = client.db(dbName);

  // I create hard coded user data to add to the database.
  const people = [
    {
    title: "Mx", 
    firstName:"John", 
    surname:"Doe", 
    mobile: 8987777, 
    email:"John@gmail.com",
    home_address: {
      address_line_1: "57 Elmsville Green",
      address_line_2: "",
      town: "Blackrock",
      county: "Co. Cork",
      EIRCODE: "T12 Z7C9"
    },
    shipping_address: {
      address_line_1 : "199 Coopersfalls Crossing",
      address_line_2 : "Skerries",
      town : "Arklow",
      county : "Co. Wicklow",
      EIRCODE : "Y14 A9E0"
    }
  },
  {
    title: "Ms", 
    firstName:"Mary", 
    surname:"Johnson", 
    mobile: 83720123, 
    email:"Mary@gmail.com",
    home_address: {
      address_line_1: "34 Lawfield Road",
      address_line_2: "",
      town: "Sandymount",
      county: "Co. Dublin",
      EIRCODE: "D34 DC7"
    },
    shipping_address: {
      address_line_1 : "297 Green Avenue",
      address_line_2 : "Greenfield",
      town : "Lucan",
      county : "Co. Dublin",
      EIRCODE : "S89 P79"
    }
  },
  {
    title: "Mrs", 
    firstName:"Jenny", 
    surname:"Smith", 
    mobile: 678009356, 
    email:"Jenny@gmail.com",
    home_address: {
      address_line_1: "290 Pollock Street",
      address_line_2: "",
      town: "Mullingar",
      county: "Co. Westmeath",
      EIRCODE: "Q91 D527"
    },
    shipping_address: {
      address_line_1 : "290 Pollock Street",
      address_line_2 : "",
      town : "Mullingar",
      county : "Co. Westmeath",
      EIRCODE : "Q91 D527"
    }
  }
];

// Details of one of the users to be updated.
const person0_updated_details = {
  title: "Mx",
  email: "JohnNewMail@gmail.com",
  mobile: 8987777,
  home_address: {
    address_line_1: "55 Elmsville Green",
    address_line_2: "Loks",
    town: "Blackrock",
    county: "Co. Cork",
    EIRCODE: "T16 Z7C9"
  },
  shipping_address: {
    address_line_1: "55 Elmsville Green",
    address_line_2: "Loks",
    town: "Blackrock",
    county: "Co. Cork",
    EIRCODE: "T16 Z7C9"
  }
};

// Here I create phone data to add to the database.
const phones = [
  {
    manufacturer: "Samsung", 
    model: "Galaxy S20", 
    price: 399
  },
  {
    manufacturer: "Samsung", 
    model: "Galaxy S10", 
    price: 300
  },
  {
    manufacturer: "Xiaomi", 
    model: "Redmi", 
    price: 200
  },
  {
    manufacturer: "Apple", 
    model: "Iphone 5s", 
    price: 200
  },
  {
  manufacturer: "Apple", 
  model: "Iphone X", 
  price: 500
}];

// Details of one of the phones to be updated.
const phone4_details_upated = {
  manufacturer: "Apple",
  model: "Iphone Xs",
  price: 450
};

  // Here I perform all the CRUD functionalities by inserting, updating, finding and removing data.
  console.log("Inserting customers in the Customers collection:\n");
  insertElements('Customers',people, db, function(result_insert_customers) {
    console.log("Inserting phones in the Phones collection:\n");
    insertElements('Phones',phones, db, function(result_insert_phones) {
      // I create orders by associating a user with his/her phone purchases.
      const orders = [
        {
          customer: result_insert_customers.insertedIds[0],
          phones_purchased: [result_insert_phones.insertedIds[0], result_insert_phones.insertedIds[1]]
        },
        {
          customer: result_insert_customers.insertedIds[1],
          phones_purchased: [result_insert_phones.insertedIds[4], result_insert_phones.insertedIds[3], result_insert_phones.insertedIds[0]]
        },
        {
          customer: result_insert_customers.insertedIds[2],
          phones_purchased: [result_insert_phones.insertedIds[2]]
        }
      ];
      console.log("Inserting orders in the Orders collection:\n");
      insertElements('Orders',orders, db, function() {
        console.log("Showing Customers collection:\n");
        findCollection('Customers', db, function(){
          console.log("Showing Phones collection:\n");
          findCollection('Phones', db, function(){
            console.log("Showing Orders collection:\n");
            findCollection('Orders', db, function(){
              console.log("Updating information for customer 0:\n");
              updateCustomer(people[0], person0_updated_details, db, function(){
                console.log("Showing new information for customer 0 after update: \n");
                findElement('Customer',person0_updated_details,db, function(){
                  console.log("Showing orders for customer 0: \n");
                  findOrdersByCustomerID(result_insert_customers.insertedIds[0], db, function(){
                    console.log("Updating phone info: \n");
                    updatePhone(phones[4],  phone4_details_upated, db, function(){
                      const order1_details_updated = {  
                        customer: result_insert_customers.insertedIds[1],
                        phones_purchased: [result_insert_phones.insertedIds[0]]
                      };
                      console.log("Updating order info for customer 1: \n");
                      updateOrder(orders[1], order1_details_updated,db, function(){
                        console.log("Removing order info for customer 2: \n");
                        removeOrderByCustomerID(result_insert_customers.insertedIds[2], db, function(){
                          console.log("Removing phone info for phone 2: \n");
                          removePhone(phones[2], db, function(){
                            console.log("Removing customer info for customer 2: \n");
                            removeCustomer(people[2], db, function(){
                              client.close();
                            })
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

// I create a generic Insert function. The collection name (coll) must be passed as argument.
// objectDetails is an array containing the documents to be inserted into the collection specified.
const insertElements = function(coll, objectDetails, db, callback) {
  const collection = db.collection(coll);
  collection.insertMany(objectDetails, function(err, result) {
    assert.equal(err, null);
    assert.equal(objectDetails.length, result.insertedCount);
    assert.equal(objectDetails.length, Object.keys(result.insertedIds).length);
    console.log("Succesfully inserted "+coll+" into the database.\n");
    callback(result);
  });
}

// This function is a generic function that will retrieve results when searching for a specific document in a given collection.
const findElement = function(coll, objectDetails, db, callback) {
  const collection = db.collection(coll);
  collection.find(objectDetails).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records in the collection: "+coll+", for element: "+objectDetails);
    console.log(docs);
    callback(docs);
  });
}

// This function will return the orders correcsponding to the customer ID passed as a parameter.
const findOrdersByCustomerID = function(customerID, db, callback) {
  const collection = db.collection('Orders');
  collection.find({customer: customerID}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records in Orders collection for customer with ID: "+customerID);
    console.log(docs);
    callback(docs);
  });
}

// This is a generic function that will return the records for the collection passed as argument.
const findCollection = function(coll, db, callback) {
    const collection = db.collection(coll);
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records for collection "+coll);
      console.log(docs)
      callback(docs);
    });
}

// This function will update details for a phone document.
const updatePhone = function(phoneDetails,newDetails, db, callback) {
  const collection = db.collection('Phones');
  // Update document where details are phoneDetails and set them to newDetails.
  collection.updateOne(phoneDetails
    , { $set: { manufacturer :  newDetails.manufacturer, model: newDetails.model, price: newDetails.price } }, function(err, result) {
    assert.equal(err, null);
    console.log("Updated manufacturer, model and price of the document in Phones collection");
    callback(result);
  });  
}

// This function will update details for a customer document.
const updateCustomer = function(customerDetails,newDetails, db, callback) {
    const collection = db.collection('Customers');
    // Update document where details are customerDetails and set them to newDetails.
    collection.updateOne(customerDetails
      , { $set: { email :  newDetails.email, title: newDetails.title, mobile: newDetails.mobile, shipping_address: newDetails.shipping_address, home_address: newDetails.home_address } }, function(err, result) {
      assert.equal(err, null);
      console.log("Updated email, mobile, title, home and shipping address of the document in Customers collection");
      callback(result);
    });  
}

// This function will update details for a order document.
const updateOrder = function(orderDetails,newDetails, db, callback) {
  const collection = db.collection('Orders');
  collection.updateOne(orderDetails
    , { $set: { customer :  newDetails.customer, phones_purchased: newDetails.phones_purchased} }, function(err, result) {
    assert.equal(err, null);
    console.log("Updated customer and phones purchased of the document");
    callback(result);
  });  
}

// This function will remove a customer from the database matching the customerDetails.
const removeCustomer = function(customerDetails, db, callback) {
    const collection = db.collection('Customers');
    collection.deleteOne({ email : customerDetails.email, mobile: customerDetails.mobile, firstName: customerDetails.firstName, surname: customerDetails.surname }, function(err, result) {
      assert.equal(err, null);   
      console.log("Removed the document of customer with Name :"+ customerDetails.firstName);
      callback(result);
    });    
}

// This function will remove a phone from the database matching the phoneDetails.
const removePhone = function(phoneDetails, db, callback) {
  const collection = db.collection('Phones');
  collection.deleteOne(phoneDetails, function(err, result) {
    assert.equal(err, null);   
    console.log("Removed phone:"+ phoneDetails.model);
    callback(result);
  });    
}

// This function will remove an order from the database matching the orderDetails.
const removeOrder = function(orderDetails, db, callback) {
  const collection = db.collection('Orders');
  collection.deleteOne(orderDetails, function(err, result) {
    assert.equal(err, null);     
    console.log("Removed Order of customer:"+ orderDetails.customer);
    callback(result);
  });    
}

// This function will remove an order given the customer ID.
const removeOrderByCustomerID = function(customerID, db, callback) {
  const collection = db.collection('Orders');
  collection.deleteOne({customer: customerID}, function(err, result) {
    assert.equal(err, null);    
    console.log("Removed Order of customer:"+ customerID);
    callback(result);
  });    
}

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
