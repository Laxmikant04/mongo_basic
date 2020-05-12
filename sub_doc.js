// Below code will print out 1-4 in order
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
const db = mongoose.connection;

const parentSchema = require('./schema/parentSchema');
const parentModel = mongoose.model('parent',parentSchema);

const childSchema = require('./schema/childSchema');
const childModel =  mongoose.model('child',childSchema);


db.once('open',()=>{
    
    let child = new childModel({name: 'child'})
    let child1 = new childModel({name: 'child1'})

    
    let parent = new parentModel({
        name : 'parent',
        child: child,
        children: [child,child1]
    })


    childSchema.pre('validate', function(next) {
        console.log('2');
        next();
    });
      
    childSchema.pre('save', function(next) {
        console.log('3');
        next();
    });

    parentSchema.pre('validate', function(next) {
        console.log('1');
        next();
    });
    
    parentSchema.pre('save', function(next) {
        console.log('4');
        next();
    });
      

    // parent.save((err,doc) =>{
    //     if(err) return console.log(err);
    //     console.log(doc)
    // })

    // parentModel.find((err,docs) => {
    //     console.log(docs)
    // })

    // parentModel.findOne({name:'parent'},(err,doc) => {
    //     console.log(doc.children.find("5eb7e61d26d05d5480b343c0"))
    // })
    
    const cursor = parentModel.find({name:'parent'}).cursor().on('data', function(doc) { console.log(doc); }).
    on('end', function() { console.log('Done!'); });

    // for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    //     console.log(doc); // Prints documents one at a time
    //   }

})

