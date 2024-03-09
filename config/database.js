const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/nodejsAssignment', {
  useNewUrlParser: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection to MongoDB failed:', err));

module.exports = mongoose;