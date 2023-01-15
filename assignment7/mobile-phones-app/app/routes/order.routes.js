module.exports = (app) => {
    const orders = require('../controllers/order.controllers.js');

    /*  == USER INTERFACE ADDITIONS == */
    // In this case the root is /order_view as there is a different view hbs file to render in order to display the orders database.
    app.get('/order_view', orders.root);
    /*  == USER INTERFACE ADDITIONS == */

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

    /*  == USER INTERFACE ADDITIONS == */
    // I enable being able to search for orders based on the customer who made it.
    app.get('/customer/:s', orders.searchCustomer);
    /*  == USER INTERFACE ADDITIONS == */
}