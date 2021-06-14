const File = require("../models/File");
const Trash=require("../models/Trash");

module.exports=async(req,res)=>{
    //req.body.id == file._id
    
    //updateposted가 삭제된 시간!
    const file=await File.findById(req.body.id);
    await Trash.create({_id:file._id,
        name:file.name, 
        size:file.size,
        url:file.url,
        userid:file.userid, 
        datePosted:file.datePosted,
        updateid:file.updateid, 
        room:file.room},
        (error,data)=>{
           console.log(error,data);
    });

    File.deleteOne({_id:req.body.id},function(err,data){
        if(err){
            console.log(error);
        }
        if(data){
            res.send('<script type="text/javascript">alert("삭제되었습니다!"); parent.document.location.reload(); window.location.href="/room/'+req.body.room+'/main"; </script>');
        }
       
    });
    
}