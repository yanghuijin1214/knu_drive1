//게시판 업로드 처리
const Board = require("../models/Board");
const path=require('path')

//업로드할때 room(_id)도 있어야함.
module.exports=(req,res)=>{
    console.log(req.files);
    if(req.files!=null){
        let image=req.files.image;
        image.mv(path.resolve(__dirname,'../views/img',image.name),async(error)=>{
            await Board.create({title:req.body.title,
                body:req.body.body,
                image:'/img/'+image.name,
                room:req.body.room,
                userid:req.session.userId
            },
            (error,board)=>{
                console.log(error,board);
            })
            res.redirect('/room/'+req.body.room+"/boards"); 
        })
    }
    else{
        Board.create({title:req.body.title,
            body:req.body.body,
            room:req.body.room,
            userid:req.session.userId
        },
        (error,board)=>{
            console.log(error,board);
        })
        res.redirect('/room/'+req.body.room+"/boards");        
    }    
    
}