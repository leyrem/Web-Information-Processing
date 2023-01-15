
module.exports = (app) => {
    const phones = require('../controllers/phone.controllers.js');

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
}