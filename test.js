const mongoose=require('mongoose');

const Room=require('./models/Room');

mongoose.connect('mongodb+srv://huijin:huijin1234@cluster0.ldzbg.mongodb.net/drive',{useNewUrlParser:true});

Room.create({key:'1234'},(error,room)=>{
    console.log(error,room);
});
