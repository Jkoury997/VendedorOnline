const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://admin:jorge123@vps-3687594-x.dattaweb.com:27017/mkCatalogoOnline');
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('Error conectándose a MongoDB', err);
    throw err;
  }
};

module.exports = connectDB;