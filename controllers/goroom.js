const Room=require("../models/Room.js");
const User=require("../models/User.js");

module.exports=(req,res)=>{
    if(req.body.key){
    var key=req.body.key;
    
    Room.findOne({key:key},function(err,data){
        if(err){
            console.log(err); 
        }
        if(!data){
            res.send('<script type="text/javascript">alert("잘못된 키 입니다."); window.location.href="/";</script>');
        }
        else{
            console.log(data);
            User.updateOne({_id:req.session.userId}, { $set: {access:true },$push:{rooms:data }},function(err,data){
                if(err){
                    console.log(err);
                }
                if(data){
                    console.log(data);
                }
            });
            res.redirect("/room/"+data._id);
        }
    })
    }
    else if(req.body.room){
        res.redirect("/room/"+req.body.room);
    }
}