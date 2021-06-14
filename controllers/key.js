const User=require('../models/User.js');

module.exports=(req,res)=>{
    if(req.session.userId){
        User.findById(req.session.userId,(error,user)=>{
            if(error){
                console.log(error);
                return res.render('key',{access:false});
            }
            if(user){
                return res.render('key',{access:user.access,room:user.rooms[0]});
            }
            else{
                return res.redirect('/');
            }
        })
        
    }
    else{
        res.redirect('/login');
    }
    
}