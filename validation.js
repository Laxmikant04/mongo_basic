var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
const db = mongoose.connection;
const Schema = mongoose.Schema;


db.once('open',()=>{
    let personSchema =  new Schema({
        name:{
            type:String,
            required:true
        },
        age:{
            type:Number,
            min:[2,"min val"],
            max:[10,"max vald"]
        },
        number:{
            type:Number,
            validate:{
                validator:(val)=>{
                    return /\d{3}-\d{3}-\d{4}/.test(val);
                },
                message:"custom validator"
            }
        }
    })

    let Person = new mongoose.model('Person',personSchema);

    let person = new Person({
        name:'lax',
        age:4,
        number:"jdfjdgfjdfjdgfjd"
    });

    // let err = person.validateSync();
    // console.log(err.errors['number'].message);

    person.save((err,doc) =>{
        console.log(err);
    })
})