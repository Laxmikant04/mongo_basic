var mongoose = require('mongoose');

let kittySchema = require('../schema/kittySchema');

let kittyModel =  mongoose.model('Kitten',kittySchema);

module.exports = kittyModel;