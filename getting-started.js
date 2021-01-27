var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

const KittyModel =  require('./model/kittyModel');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connected")

  var kittyDoc = new KittyModel({ name: 'Silence',value:15 }); 
  
//   kittyDoc.save((err,doc) => {
//     if(err) console.log("err");
//     console.log("doc",doc);
//     doc.speak();
//   })

//   KittyModel.find((err,docs) =>{
//       if(err) console.log("err");
//         console.log("docs--",docs)
//   })

// KittyModel.findOneAndUpdate({name:'Silence'},{name:'lax'},(err,doc) => {
//       if(err) console.log("err");
//         console.log("docs--",doc)
// })

// kittyDoc.save((err,doc)=>{
//     if(err) console.log(err);
//     console.log(doc)
// })

// KittyModel.deleteOne({name :'lax'},(err) =>{
//     if(err) return console.log("err",err);
//     console.log("deleted")
// })

// KittyModel.updateMany({name:'Silence'},{name:'new Name'},(err,row) => {
//     if(err) return console.log(err);
//     console.log(row);
// })

KittyModel.watch().
    on('change', data => console.log(new Date(), data));

kittyDoc.save((err,doc)=>{
    if(err) console.log(err);
    console.log(doc)
})

});