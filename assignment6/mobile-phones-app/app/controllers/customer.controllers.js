// This file contains the controllers for the customer collection.

const Customer = require('../models/customer.model.js');

// Default message for /
exports.root= (req, res) => {
    console.log("My Mobile Phone Store App. Use the app to manage customers, mobiles and orders!")
    return res.status(200).send({
        message: "My Mobile Phone Store App. Use the app to manage customers, mobiles and orders!"
    });
};


// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate the request
    if(!req.body) {
        return res.status(400).send({
            message: "Customer content cannot be empty!"
        });
    }
    // Create a new Customer (using schema)
    const customer = new Customer({
        title: req.body.title,
        firstName: req.body.firstName,
        surname: req.body.surname,
        mobile: req.body.mobile,
        email: req.body.email,
        home_address: {
            address_line_1: req.body.home_address.address_line_1,
            address_line_2: req.body.home_address.address_line_2,
            town: req.body.home_address.town,
            county: req.body.home_address.county,
            EIRCODE: req.body.home_address.EIRCODE
        },
        shipping_address: {
            address_line_1: req.body.shipping_address.address_line_1,
            address_line_2: req.body.shipping_address.address_line_2,
            town: req.body.shipping_address.town,
            county: req.body.shipping_address.county,
            EIRCODE: req.body.shipping_address.EIRCODE
        }
    });
    // Save Customer in the database
    customer.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Customer."
        });
    });
};


// Retrieve and return all customers from the database.
exports.findAll = (req, res) => {
    Customer.find().then(customers => {
        res.send(customers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Customers."
        });
    });
};

// Find a single customer with a customerId
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId).then(customer => {
        if(!customer) {
            return res.status(404).send({
            message: "Customer not found with id " + req.params.customerId
            });
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        return res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.customerId
        });
    });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Customer content cannot be empty"
        });
    }
    // Find the Customer and update it with the request body
    Customer.findByIdAndUpdate(req.params.customerId, {
        title: req.body.title,
        firstName: req.body.firstName,
        surname: req.body.surname,
        mobile: req.body.mobile,
        email: req.body.email,
        home_address: {
            address_line_1: req.body.home_address.address_line_1,
            address_line_2: req.body.home_address.address_line_2,
            town: req.body.home_address.town,
            county: req.body.home_address.county,
            EIRCODE: req.body.home_address.EIRCODE
        },
        shipping_address: {
            address_line_1: req.body.shipping_address.address_line_1,
            address_line_2: req.body.shipping_address.address_line_2,
            town: req.body.shipping_address.town,
            county: req.body.shipping_address.county,
            EIRCODE: req.body.shipping_address.EIRCODE
        }
    }, { $set: req.body,
        new:true // "new: true" return updated object
         }).then(customer => {
        if(!customer) {
            return res.status(404).send({
            message: "Customer not found with id " + req.params.customerId
            });
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        return res.status(500).send({
            message: "Error updating Customer with id " + req.params.customerId
        });
    });
};
    
// Update a Customer firstName identified by the customerId in the request
exports.updateName = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Customer content cannot be empty"
        });
    }
    // Find the Customer and update oly its firstName with the request body
    Customer.findByIdAndUpdate(req.params.customerId, {
        firstName: req.body.firstName
    },
    { new: true }) // "new: true" return updated object
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        return res.status(500).send({
            message: "Error updating Customer with id " + req.params.customerId
        });
    });
};

// Delete a customer with the specified customerId in the request
exports.delete = (req, res) => {
    Customer.findByIdAndRemove(req.params.customerId).then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        res.send({message: "Customer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        return res.status(500).send({
            message: "Could not delete Customer with id " + req.params.customerId
        });
    });
};
    