const User=require('../models/User')

module.exports=(req,res,next)=>{
    if(req.session.userId){
        User.findById(req.session.userId,(error,user)=>{
            if(error||!user) return res.redirect('/');
            if(user) {
                if(!user.access){
                    return res.redirect('/');
                }
            }
        });
    }
    else{
        return res.redirect('/login');
    }
    next();
    
}