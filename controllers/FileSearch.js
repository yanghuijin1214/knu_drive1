//파일 검색. 포함되는 내용 있으면 띄워주기
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
    var search=req.query.search;
    var id=req.params.id;

    if(search!=undefined&&search!=""){
        var files=await File.find({name:{$regex:search}}).populate('userid');

        
        for(var i=0;i<files.length;i++){
            files[i].strsize=formatBytes(files[i].size);
        }

        res.render('searchBoard',{files,room:id});
    }
    else{
        res.redirect("/room/"+id+"/main");
    }
    
}

