const Room=require('../models/Room');
const User=require('../models/User');


function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

module.exports=async(req,res)=>{
    const users=await User.find({rooms:{$all:[req.params.id]}},{username:1});
    const roomf=await Room.findById(req.params.id);

    var size=formatBytes(roomf.size);
    res.render('driveEx',{room:req.params.id, user:req.session.name, size:size,users,isize:roomf.size});
}