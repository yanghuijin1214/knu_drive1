//다시 휴지통에서 드라이브로
const File = require("../models/File");
const Trash=require("../models/Trash");

module.exports=async(req,res)=>{
    //req.body.id == file._id
    
    //updatePosted가 복원날짜
    const trash=await Trash.findById(req.body.id);
    await File.create({_id:trash._id,
        name:trash.name, 
        size:trash.size,
        userid:trash.userid, 
        url:trash.url,
        datePosted:trash.datePosted,
        updateid:trash.updateid, 
        room:trash.room},
        (error,data)=>{
           console.log(error,data);
    });

    Trash.deleteOne({_id:req.body.id},function(err,data){
        if(err){
            console.log(error);
        }
        if(data){
            console.log('Data deleted');

            res.send('<script type="text/javascript">alert("복구되었습니다!");parent.document.location.reload(); window.location.href="/room/'+req.params.id+'/trash"; </script>');
        }
       
    });
    
}