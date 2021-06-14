//이미 로그인 상태인데 로그인,회원가입하려고 할 때 redirect

module.exports=(req,res,next)=>{
    if(req.session.userId){
        return res.redirect('/')
    }
    next();
}
