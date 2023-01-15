module.exports = (app) => {
    const customers = require('../controllers/customer.controllers.js');

    // Create a new Customer
    app.post('/customers', customers.create);

    // Retrieve all Customers
    app.get('/customers', customers.findAll);

    // Retrieve a single Customer specified by customerId
    app.get('/customers/:customerId', customers.findOne);

    // Update a Customer specified by customerId
    app.put('/customers/:customerId', customers.update);

    // Update a Customer namespecified by customerId
    app.put('/customers/name/:customerId', customers.updateName);

    // Delete a Customer specified by customerId
    app.delete('/customers/:customerId', customers.delete);
}