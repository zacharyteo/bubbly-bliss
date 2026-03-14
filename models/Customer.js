const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: { 
    type: String, 
    required: true 
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    default: ''
  },
  preferences: {
    sugarLevel: { type: String, enum: ['0%', '25%', '50%', '75%', '100%'], default: '50%' },
    iceLevel: { type: String, enum: ['no ice', 'less ice', 'normal', 'more ice'], default: 'normal' },
    favoriteCategories: [String]
  },
  orderHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Customer = mongoose.model('Customer', customerSchema);

exports.findByEmail = function(email) {
  return Customer.findOne({ email: email });
};

exports.createAccount = function(newCustomer) {
  return Customer.create(newCustomer);
};

exports.updateOrderHistory = async function(customerId, orderId) {
  const customer = await Customer.findOne( { _id: customerId } );

  // Update customer order history
  let orderHistory = customer.orderHistory;
  orderHistory = orderHistory || [];
  orderHistory.push(orderId)
  
  return Customer.updateOne({ _id: customerId }, {orderHistory: orderHistory});

}