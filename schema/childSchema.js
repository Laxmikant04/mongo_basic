var mongoose = require('mongoose');

let childSchema = new mongoose.Schema({
    name :String
})

module.exports = childSchema;