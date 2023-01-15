const mongoose = require('mongoose');

// create a mongoose schema for a customer
const CustomerSchema = mongoose.Schema({
    title: String,
    firstName: String,
    surname: String,
    mobile: Number,
    email: String,
    home_address: {
        address_line_1: String,
        address_line_2: String,
        town: String,
        county: String,
        EIRCODE: String
    },
    shipping_address:{
        address_line_1: String,
        address_line_2: String,
        town: String,
        county: String,
        EIRCODE: String
    }
}, {
    timestamps: true
});
// export the model to our app
module.exports = mongoose.model('Customer', CustomerSchema);

