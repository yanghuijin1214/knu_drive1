const User=require('../models/User.js');

module.exports=(req,res)=>{
    User.create(req.body,(error,user)=>{
        if(error){
            console.log(error);
            return  res.send('<script type="text/javascript">alert("회원가입 실패. 다시 시도해주세요."); window.location.href="/login";</script>');
        }
        if(user){
            console.log(user);
            res.send('<script type="text/javascript">alert("회원가입 완료"); window.location.href="/login";</script>');
        }
    })
}