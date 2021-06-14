const express=require("express");
const fileUpload=require('express-fileupload');
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://huijin:huijin1234@cluster0.ldzbg.mongodb.net/drive',{useNewUrlParser:true});

const expressSession=require('express-session');

const app=new express();
app.use(express.static("views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(fileUpload());

app.use(expressSession({
    secret:'keyboard cat'
}))

const ejs=require("ejs");
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);

//다크모드 확인
global.mode=0;

let port=process.env.PORT;
if(port==null||port==""){
    port=4000;
}

app.listen(port,()=>{
    console.log('App listening ...')
})
const User=require('./models/User');

const key=require("./controllers/key");
const keycheck=require("./controllers/goroom");
const Login=require("./controllers/login");
const LoginRe=require("./controllers/loginRe");
const JoinRe=require("./controllers/JoinRe");
const logout=require('./controllers/logout');
const main=require('./controllers/main');
const drive=require('./controllers/drive');
const fileUp=require('./controllers/fileUpload');
const fileDelete=require('./controllers/fileDelete');
const fileRestore=require('./controllers/fileRestore');
const setting=require('./controllers/Setting');

const getBoardList=require("./controllers/getBoardList");
const getBoard=require("./controllers/getBoard");
const getTrash=require("./controllers/getTrash");
const TrashDelete=require('./controllers/TrashDelete');

const BoardUpload=require("./controllers/BoardUpload");
const BoardUploadRe=require("./controllers/BoardUploadRe");
const BoardDelete=require("./controllers/BoardDelete");
const checkUser=require("./controllers/checkUser");
const fileSearch=require("./controllers/FileSearch")

const ifLoggedM=require('./middleware/ifLoggedIn');
const roomAccess=require('./middleware/roomAccess');

app.use("*",(req,res,next)=>{
    mode=parseInt(req.session.mode);
    next()
});

app.get('/',key);

app.post('/goroom',keycheck);

//로그인,회원가입 페이지
app.get('/login',ifLoggedM,Login);
//로그인 완료 처리
app.post('/loginOk',ifLoggedM,LoginRe);

//회원가입 처리
app.post('/joinOk',ifLoggedM,JoinRe);



//다크모드
app.post("/room/:id/mode",roomAccess,function(req,res){
    if(req.body.mode_v==1){
        mode=1;
        req.session.mode=1;
    }
    else{
        mode=0;
        req.session.mode=0;
    }
    User.updateOne({_id:req.session.userId},{$set:{mode:mode}},(err,data)=>{
        if(err){
            console.log(err);
        }
    });
    res.redirect("/room/"+req.params.id);
})

//공유드라이브 메인페이지
app.get('/room/:id',roomAccess,main);

app.get('/room/:id/main',roomAccess,drive);

//파일 업로드
app.post('/room/:id/upload',roomAccess,fileUp);

//파일 삭제
app.post('/room/delete',roomAccess,fileDelete);

//검색
app.get("/room/:id/search",roomAccess,fileSearch);

//휴지통
app.get('/room/:id/trash',roomAccess,getTrash);

//휴지통 복구
app.post('/room/:id/restore',roomAccess,fileRestore);

//휴지통 삭제
app.post('/room/:id/trash/delete',roomAccess,TrashDelete);

//환경설정
app.get('/room/:id/setting',roomAccess,setting);

//게시판
app.get('/room/:id/boards',roomAccess,getBoardList);

//글 하나
app.get('/room/:id/board/:name',roomAccess,getBoard);

//게시글 삭제
app.post('/room/:id/board/delete',roomAccess,BoardDelete);

//게시판 업로드 페이지
app.get('/room/:id/boards/upload',roomAccess,BoardUpload);

//게시판 업로드 완료
app.post('/boards/uploadOk',BoardUploadRe);

//로그아웃
app.get('/logout',logout);

app.get('/checkuser/:id',checkUser);