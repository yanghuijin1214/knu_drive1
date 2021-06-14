const Room = require("../models/Room");
var fs=require('fs');
const path = require('path');
const Trash=require("../models/Trash");



module.exports=async(req,res)=>{
    //req.body.id == file._id
    var room=req.params.id;
    var roomSize=0;
    
    const trash=await Trash.findById(req.body.id);
    
    const filePath = path.join(__dirname, '../views/drive',trash.name);
    //room의 size 줄여주기
    await Room.findOne({_id:room},function(err,data){
        if(err){
            console.log(err);
        }
        if(data){
            roomSize=data.size-trash.size;
            if(roomSize<0)roomSize=0;

            Room.updateOne({_id:room},{$set:{size:roomSize}},(err,data)=>{
                if(err){
                    console.log(err);
                }
                if(data){
                    console.log(roomSize);
                }
            });
        }
    })

    Trash.deleteOne({_id:req.body.id},function(err,data){
        if(err){
            console.log(error);
        }
        if(data){
            fs.access(filePath, fs.constants.F_OK, (err) => { // A
                if (err) {
                    res.send('<script type="text/javascript">alert("삭제 실패하였습니다..."); window.location.href="/room/'+req.params.id+'/trash"; </script>');
                }
                fs.unlink(filePath, (err) => err ?  
                console.log(err) : console.log(`${filePath} 를 정상적으로 삭제했습니다`));
                
            });
            res.send('<script type="text/javascript">alert("삭제되었습니다!"); window.parent.location.reload(); window.location.href="/room/'+req.params.id+'/trash"; </script>');
        }
    });
    

}