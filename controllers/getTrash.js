const Trash=require("../models/Trash");

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


module.exports=async(req,res)=>{
    var trash=await Trash.find({room:req.params.id}).populate('userid');

    for(var i=0;i<trash.length;i++){
        trash[i].strsize=formatBytes(trash[i].size);
    }
    res.render('trash',{
        trash,
        room:req.params.id
    });
}