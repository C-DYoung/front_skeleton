const express = require('express');
const router = express.Router();
const boardDAO = require('./boardDAO');



// 유저 요청이들어오면 실행..
// http://localhost:8000/boards/boardList
router.get('/boardList', function(req, res, next) {
    console.log('board router, borad list....')
    // const data = req.body
    // resp - 호출 될 함수.
    // callback 의 내용이 들어오게 됨.
    boardDAO.boardList((resp)=>{
        res.json(resp)
    })
})
// get 방식 사용 시, 프론트 개발이 안되었어도 url로 들어가서 확인이 가능함. 
// post 방식은 유저입력을 통하여 확인이 가능하기 때문에 
// 프론트부터 개발을 하는 것이 편할 것임. 
router.post('/insert', async (req, res, next) => {
    console.log('board router, board insert ... ')
    // res.send('sss')
    // post방식은 request body를 통해서 데이터를 전달하는 방식
    const data = req.body
    boardDAO.insert(data, (resp)=>{
        res.json(resp)
        
    })

})
// :id => react의 router에서 찾아보기. 
router.get('/board/:id', function (req, res, next) {
    console.log('board router, borad....')
    // // res.send('sss')
    // const {id} = req.params
    // boardDAO.board(id, (resp) => {
    //     res.send(resp)
    // })

    const id = req.params.id
    boardDAO.board(id, (resp) => {
        res.json(resp)
    })

})

router.post('/delete/:id', function(req, res, next) {
    // const id = req.params.id
    // boardDAO.delete(id, (resp) => {
    //     res.json(resp)
    // })
    const id = req.params.id
    boardDAO.delete(id, (resp) => {
        res.json(resp)
    })
})

router.post('/update', function(req, res, next) {
    // console.log('update00')
    // const data = req.body
    // console.log('update11')
    // boardDAO.update(data, (resp)=>{
    //     res.json(resp)
        
    // })
    const data = req.body
    boardDAO.update(data, (resp)=>{
        res.json(resp)
        
    })
})


module.exports = router