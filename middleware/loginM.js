const User=require('../models/User')

module.exports=(req,res,next)=>{
    if(req.session.userId){
        User.findById(req.session.userId,(error,user)=>{
            if(error||!user) return res.redirect('/')
            next();
        })
    }
    next();
    
}