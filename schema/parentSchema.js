const mongoose = require('mongoose');
const childSchema = require('./childSchema');

let parentSchema = new mongoose.Schema({
    name :String,
    children : [childSchema],
    child : childSchema
})

module.exports = parentSchema;