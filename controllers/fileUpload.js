//파일 업로드 처리
const File = require("../models/File");
const Room = require("../models/Room");
const path=require('path')

//업로드할때 room(_id)도 있어야함.
module.exports=(req,res)=>{
    //image ?? file (안되면 수정)
    console.log(req.body);
    if(req.files){
        let file=req.files.file;
        var room=req.params.id;
        var size=0;

        file.mv(path.resolve(__dirname,'../views/img/',file.name),async(error)=>{
            size+=file.size;
            console.log(size);
            await File.create({
                name:file.name,
                room:room,
                url:'/img/'+file.name,
                size:file.size,
                userid:req.session.userId},
            (error,file)=>{
                if(error){
                    console.log(error);
                }
                if(file){
                    console.log(file);
                }
            });
            //room의 size도 늘려주기
            await Room.findOne({_id:room},function(err,data){
                if(err){
                    console.log(err);
                }
                if(data){
                    size+=data.size;
                    Room.updateOne({_id:room},{$set:{size:size}},(err,data)=>{
                        if(err){
                            console.log(err);
                        }
                        if(data){
                            console.log(size);
                        }
                    });
                }
            });
            
            await Room.updateOne({_id:room},{$set:{size:size}});
            res.redirect('/room/'+req.params.id);
        })
    }
    else{
        res.send('<script type="text/javascript">alert("파일 첨부를 확인해주세요!"); window.location.href="/room/'+req.params.id+'"; </script>');
    }

    
}

