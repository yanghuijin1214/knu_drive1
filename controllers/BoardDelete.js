//게시글 삭제
const Board = require("../models/Board");

//업로드할때 room(_id)도 있어야함.
module.exports=(req,res)=>{
    const post_id=req.body.id;

    Board.deleteOne({_id:post_id}).then(function(){
        console.log('Data deleted');
        //aert 띄우기
        res.send('<script type="text/javascript">alert("삭제되었습니다!"); window.location.href="/room/'+req.params.id+'/boards"; </script>');
    }).catch(function(error){
        console.log(error);
    })
}