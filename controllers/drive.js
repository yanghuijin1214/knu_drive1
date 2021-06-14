//메인페이지 (파일 리스트)
const File=require('../models/File');

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
    var files=await File.find({room:id}).populate('userid');

    for(var i=0;i<files.length;i++){
        files[i].strsize=formatBytes(files[i].size);
    }
    res.render('mainBoard',{
        files,
        room:id
    });
}