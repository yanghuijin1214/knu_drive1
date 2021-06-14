//게시글 업로드 페이지
module.exports = (req,res)=>{
    if(req.session.userId){
        return res.render('boardupload',{
            room:req.params.id
        });
    }
    res.render('boardupload',{
        room:req.params.id
    });
}