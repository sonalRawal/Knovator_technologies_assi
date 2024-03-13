const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sonurawal931:91gzBbgMyGwPz6y2@cluster0.7fdqrt6.mongodb.net/')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection to MongoDB failed:', err));

module.exports = mongoose;