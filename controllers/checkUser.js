const User=require('../models/User');

module.exports=async(req,res)=>{
    const users=await User.find({rooms:{$all:[req.params.id]}},{username:1});
    console.log(users);
    res.render('roomUser',{
        users
    })
}