const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const BoardSchema=new Schema({
    title:String,
    body:String,
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    image:String,
    datePosted:{
        type:Date,
        default:new Date()
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Room',
        required:true
    }
});

const Board=mongoose.model('Board',BoardSchema);

module.exports=Board;