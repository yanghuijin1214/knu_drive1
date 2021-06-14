const bcrypt=require('bcrypt');
const User=require('../models/User');

module.exports=(req,res)=>{
    const {username,password}=req.body;

    User.findOne({username:username},(error,user)=>{
        //findOne 반환값이 user
        if(user){
            bcrypt.compare(password,user.password,(error,same)=>{
                if(same){
                   req.session.userId=user._id; //id session 에 저장
                   req.session.name=user.username;
                   req.session.mode=user.mode;
                   res.send('<script type="text/javascript">alert("안녕하세요 '+user.username+' 님! "); window.location.href="/";</script>');
                }
                else{
                    res.send('<script type="text/javascript">alert("비밀번호를 확인해주세요."); window.location.href="/login";</script>');
                }
            })
        }
        else{
            res.send('<script type="text/javascript">alert("존재하지 않는 아이디입니다"); window.location.href="/login";</script>');
        }
    })
}