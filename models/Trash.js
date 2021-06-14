const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const TrashSchema=new Schema({
    name:String,
    size:Number,
    url:String,
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    datePosted:{
        type:Date,
        default:new Date()
    },
    updateid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    updatePosted:{
        type:Date,
        default:new Date()
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Room',
        required:true
    }
});

const Trash=mongoose.model('Trash',TrashSchema);

module.exports=Trash;