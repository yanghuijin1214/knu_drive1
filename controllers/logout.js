module.exports=(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/');
        //session 초기화
    })
}