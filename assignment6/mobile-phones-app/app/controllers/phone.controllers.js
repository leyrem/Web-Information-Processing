// This file contains the controllers for the 'phones' collection.

const Phone = require('../models/phone.models.js');

// Default message for /
exports.root= (req, res) => {
    console.log("My Mobile Phone Store App. Use the app to manage customers, mobiles and orders!")
    return res.status(200).send({
        message: "My Mobile Phone Store App. Use the app to manage customers, mobiles and orders!"
    });
};

// Create and Save a new Phone
exports.create = (req, res) => {
    // Validate the request
    if(!req.body) {
        return res.status(400).send({
            message: "Phone content cannot be empty!"
        });
    }
    // Create a new Phone (using schema)
    const phone = new Phone({
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        price: req.body.price
    });
    // Save Phone in the database
    phone.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Phone."
        });
    });
};


// Retrieve and return all phones from the database.
exports.findAll = (req, res) => {
    Phone.find().then(phones => {
        res.send(phones);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Phones."
        });
    });
};
    

// Find a single phone with a phoneId
exports.findOne = (req, res) => {
    Phone.findById(req.params.phoneId).then(phone => {
        if(!phone) {
            return res.status(404).send({
            message: "Phone not found with id " + req.params.phoneId
            });
        }
        res.send(phone);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.phoneId
            });
        }
        return res.status(500).send({
            message: "Error retrieving Phone with id " + req.params.phoneId
        });
    });
};

// Update a Phone identified by the phoneId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Phone content cannot be empty"
        });
    }
    // Find the Phone and update it with the request body
    Phone.findByIdAndUpdate(req.params.phoneId, {
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        price: req.body.price
    }, { $set: req.body, 
         new:true}) // "new: true" return updated object
    .then(phone => {
        if(!phone) {
            return res.status(404).send({
            message: "Phone not found with id " + req.params.phoneId
            });
        }
        res.send(phone);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.phoneId
            });
        }
        return res.status(500).send({
            message: "Error updating Phone with id " + req.params.phoneId
        });
    });
};
    
// Update a Phone price identified by the phoneId in the request
exports.updatePrice = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Phone content cannot be empty"
        });
    }
    // Find the Phone and update oly its price with the request body
    Phone.findByIdAndUpdate(req.params.phoneId, {
        price: req.body.price
    },
    { new: true }) // "new: true" return updated object
    .then(phone => {
        if(!phone) {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.phoneId
            });
        }
        res.send(phone);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.phoneId
            });
        }
        return res.status(500).send({
            message: "Error updating Phone with id " + req.params.phoneId
        });
    });
};

// Delete a phone with the specified phoneId in the request
exports.delete = (req, res) => {
    Phone.findByIdAndRemove(req.params.phoneId)
    .then(phone => {
        if(!phone) {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.phoneId
            });
        }
        res.send({message: "Phone deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.phoneId
            });
        }
        return res.status(500).send({
            message: "Could not delete Phone with id " + req.params.phoneId
        });
    });
};