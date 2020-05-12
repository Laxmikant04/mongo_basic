var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
const db = mongoose.connection;
const Schema = mongoose.Schema;


db.once('open',()=>{
    const personSchema = new mongoose.Schema({
        name : String
    })
    
    const personModel = new mongoose.model('person',personSchema);
    
    
    const storySchema = new mongoose.Schema({
        name : String,
        author : {
            type: Schema.Types.ObjectId,
            ref : personModel
        }
    })
    
    const storyModel = new mongoose.model('story',storySchema);
    
    let person = new personModel({
        name:'lax'
    });

    // person.save((err,doc) =>{
    //     let story = new storyModel({
    //         name:'story1',
    //         author:doc._id
    //     })

    //     story.save((err,doc) =>{
    //         console.log(err,doc)
    //     })
    // })

    storyModel.findOne().populate({
        path:'author',
        model: personModel 
    }).
    exec(function (err, story) {
        if (err) return handleError(err);
        console.log('The author is %s', story);
        // prints "The author is Ian Fleming"
    });

})