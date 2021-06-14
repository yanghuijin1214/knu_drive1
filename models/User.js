const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const bcrypt=require('bcrypt')

const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    access:{
        type:Boolean,
        default:false
    },
   rooms:[{
       type:mongoose.Schema.Types.ObjectId,
        ref:'Room'
    }],
    mode:{
        type:String,
        required:true,
        default:'0'
    } 
});

//저장되기 전 암호화
UserSchema.pre('save',function(next){
    const user=this;

    bcrypt.hash(user.password,10,(error,hash)=>{
        user.password=hash;
        next()
    })
})

const User=mongoose.model('User',UserSchema);
module.exports=User