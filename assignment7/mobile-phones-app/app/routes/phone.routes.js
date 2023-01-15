
module.exports = (app) => {
    const phones = require('../controllers/phone.controllers.js');

    /*  == USER INTERFACE ADDITIONS == */
    // In this case the root is /phone_view as there is a different view hbs file to render in order to display the phones database.
    app.get('/phone_view', phones.root);
    /*  == USER INTERFACE ADDITIONS == */

    // Create a new Phone
    app.post('/phones', phones.create);

    // Retrieve all Phones
    app.get('/phones', phones.findAll);

    // Retrieve a single Phone specified by phoneId
    app.get('/phones/:phoneId', phones.findOne);

    // Update a Phone specified by phoneId
    app.put('/phones/:phoneId', phones.updatePrice);

    // Update a Phone price specified by phoneId
    app.put('/phones/price/:phoneId', phones.updatePrice);

    // Delete a Phone specified by phoneId
    app.delete('/phones/:phoneId', phones.delete);

    /*  == USER INTERFACE ADDITIONS == */
    // I enable being able to search for a phone based on the model, manufacturer or price.
    app.get('/model/:s', phones.searchModel);
    app.get('/manufacturer/:s', phones.searchManufacturer);
    app.get('/price/:s', phones.searchPrice);
    /*  == USER INTERFACE ADDITIONS == */

}