const Board=require('../models/Board.js');

// 페이징 함수
async function paging(nowpage, total) { 
    // 페이지당 게시물 수 
    let page_size = 10; 
    // 보여지는 페이지의 갯수 : 1 ~ 5 페이지 
    let page_list_size = 5; 
    // limit 변수 (DB에서 가져올 게시물 수 no~ 
    let no = 0; 
    
    // 인자로 받은 현재 페이지 번호 
    curPage = Number(curPage) 
    if (curPage <= 0) { no = 0; curPage = 1; } 
    else no = (curPage - 1) * page_size; 
    // 전체 페이지 갯수 
    if (totalRowCount < 0) totalRowCount = 0; 
    let totalPage = Math.ceil(totalRowCount / page_size); 

    // 전체 페이지 수 
    if (totalPage < curPage) { 
        no = 0; curPage = 1 // totalPage 보다 더 큰 curPage가 호출되면 에러 발생시키기 
    } 
    let startPage = ((curSet - 1) * page_list_size) + 1; 
    // 시작 페이지 계산 

    let endPage = (startPage + page_list_size) - 1; 
    // 마지막 페이지 계산 

    let result = { 
        "curPage": curPage, 
        "page_list_size": page_list_size, 
        "page_size": page_size, 
        "totalPage": totalPage, 
        "startPage": startPage, 
        "endPage": endPage, 
        "no": no } 
    return result; 
}

module.exports=async(req,res)=>{
    //console.log(req.query);
    
    var totalpage=1;
    const boards=await Board.find({room:req.params.id}).populate('userid').sort({"datePosted":1});
    totalpage=boards.length/10 + 1;

    if(req.query.index){
        console.log(req.query);
        paging(req.query.index,total);
    }
    
    
    res.render('board',{
        boards,
        room:req.params.id,
        totalpage
    });
}