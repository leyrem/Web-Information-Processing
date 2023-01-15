module.exports = (app) => {
    const orders = require('../controllers/order.controllers.js');

    // Create a new Order
    app.post('/orders', orders.create);

    // Retrieve all Orders
    app.get('/orders', orders.findAll);

    // Retrieve a single Order specified by orderId
    app.get('/orders/:orderId', orders.findOne);

    // Update a Order specified by orderId
    app.put('/orders/:orderId', orders.update);

    // Update an Order's purchased_phones specified by orderId
    app.put('/orders/purchasedPhones/:orderId', orders.updatePhonesPurchased);

    // Delete an Order specified by orderId
    app.delete('/orders/:orderId', orders.delete);
}