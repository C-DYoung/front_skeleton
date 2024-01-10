const express = require('express');
const router = express.Router();
const boardDAO = require('./boardDAO');


// 유저 요청이들어오면 실행..
// http://localhost:8000/boards/boardList
router.get('/boardList', function(req, res, next) {
    console.log('board router, borad list....')
    // const data = req.body
    
    boardDAO.boardList((resp)=>{
        res.json(resp)
    })
    
})

module.exports = router