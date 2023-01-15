const mongoose = require('mongoose');

// create a mongoose schema for a Phone
const PhoneSchema = mongoose.Schema({
    manufacturer: String,
    model: String,
    price: Number
}, {
    timestamps: true
});
// export the model to our app
module.exports = mongoose.model('Phone', PhoneSchema);