module.exports = (app) => {
    const customers = require('../controllers/customer.controllers.js');

     /*  == USER INTERFACE ADDITIONS == */
    app.get('/', customers.root);
    /*  == USER INTERFACE ADDITIONS == */

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

    /*  == USER INTERFACE ADDITIONS == */
    // I enable being able to search for customers based on their First Name or Surname (as adding all fields is a bit tedious)
    app.get('/firstName/:s', customers.searchFirstName);
    app.get('/surname/:s', customers.searchSurname);
    /*  == USER INTERFACE ADDITIONS == */
}