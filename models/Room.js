const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const RoomSchema=new Schema({
    key:{
        type:String,
        required:true
    },
    datePosted:{
        type:Date,
        default:new Date()
    },
    size:{
        type:Number,
        default:0
    },
    totalSize:{
        type:String,
        default:'20000000000'
    }
});

const Board=mongoose.model('Room',RoomSchema);

module.exports=Board;