const mongoose = require('mongoose');

// create a mongoose schema for an order
const OrderSchema = mongoose.Schema({
    customer: Object,
    phones_purchased: Object
}, {
    timestamps: true
});
// export the model to our app
module.exports = mongoose.model('Order', OrderSchema);