const Trash=require("../models/Trash");
const File=require('../models/File');
const Room=require('../models/Room');

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}



module.exports=async(req,res)=>{
    var id=req.params.id;
    const room=await Room.findById(id);

    var files=await File.find({room:id}).populate('userid');
    for(var i=0;i<files.length;i++){
        if(files[i].datePosted.getTime()==files[i].updatePosted.getTime()){
            files[i].task="업로드";
        }
        else{
            files[i].task="복구";
        }
    }
    var trashes=await Trash.find({room:id}).populate('userid');
    for(var i=0;i<trashes.length;i++){
        trashes[i].task="삭제";
    }
    var all = files.concat(trashes);
    all=all.sort(function date_ascending(a, b) {
        var dateA = a.updatePosted.getTime();
        var dateB = b.updatePosted.getTime();
        return dateA < dateB ? 1 : -1;
    });
    var size=formatBytes(room.size);

    if(all.length>10){
        all=all.slice(0,10);
    }

    res.render('setting',{
        room:req.params.id,all,size,isize:room.size});
}