// This file contains the controllers for the 'orders' collection.

const Order = require('../models/order.models.js');

// Create and Save a new Order
exports.create = (req, res) => {
    // Validate the request
    if(!req.body) {
        return res.status(400).send({
            message: "Order content cannot be empty!"
        });
    }
    // Create a new Order (using schema)
    const order = new Order({
        customer: req.body.customer,
        phones_purchased: req.body.phones_purchased
    });
    // Save Order in the database
    order.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Order."
        });
    });
};


// Retrieve and return all orders from the database.
exports.findAll = (req, res) => {
    Order.find().then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Orders."
        });
    });
};
    
// Find a single order with a orderId
exports.findOne = (req, res) => {
    Order.findById(req.params.orderId).then(order => {
        if(!order) {
            return res.status(404).send({
            message: "Order not found with id " + req.params.orderId
            });
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        }
        return res.status(500).send({
            message: "Error retrieving Order with id " + req.params.orderId
        });
    });
};

// Update a Order identified by the orderId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Order content cannot be empty"
        });
    }
    // Find the Order and update it with the request body
    Order.findByIdAndUpdate(req.params.orderId, {
        customer: req.body.title,
        phones_purchased: req.body.phones_purchased
    }, { $set: req.body,
            new: true }) // "new: true" return updated object
    .then(order => {
        if(!order) {
            return res.status(404).send({
            message: "Order not found with id " + req.params.orderId
            });
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        }
        return res.status(500).send({
            message: "Error updating Order with id " + req.params.orderId
        });
    });
};
    
// Update an Order's phones_purchased identified by the orderId in the request
exports.updatePhonesPurchased = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Order content cannot be empty"
        });
    }
    // Find the Order and update oly its phones_purchased with the request body
    Order.findByIdAndUpdate(req.params.orderId, {
        phones_purchased: req.body.phones_purchased
    },
    { new: true }) // "new: true" return updated object
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        }
        return res.status(500).send({
            message: "Error updating Order with id " + req.params.orderId
        });
    });
};


// Delete an Order with the specified orderId in the request
exports.delete = (req, res) => {
    Order.findByIdAndRemove(req.params.orderId)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        }
        res.send({message: "Order deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        }
        return res.status(500).send({
            message: "Could not delete Order with id " + req.params.orderId
        });
    });
};

/*  == USER INTERFACE ADDITIONS == */
// Default message for / (get)
exports.root = (req, res) => {
    Order.find()
    .then(orders => {
        res.render('mobile_phones_view_orders',{
            results_orders: orders
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Orders."
}); });
};
// search for Orders, matching string on customer field
exports.searchCustomer = (req, res) => {
    var search = req.params.s;
    console.log("Searching Order Customer : "+search)
    Order.find({ customer: new RegExp(search,"ig")})
    .then(orders => {
        res.render('mobile_phones_view_orders',{
            results_orders: orders
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Orders."
}); });
};

/*  == USER INTERFACE ADDITIONS == */
