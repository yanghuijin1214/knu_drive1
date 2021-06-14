const Board=require('../models/Board');

module.exports=async(req,res)=>{
    const board=await Board.findById(req.params.name).populate('userid');
    var match=board.userid._id==req.session.userId;
    res.render('post',{
        board,
        room:req.params.id,
        match
    });
}