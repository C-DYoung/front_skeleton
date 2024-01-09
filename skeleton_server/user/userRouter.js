const express = require('express');
const router = express.Router();
const userDAO = require('./userDAO')

// 유저업무와 관련된 요청이 들어 왓을때 그 요청을 처리하는 역할 
// http://localhost:8000/users/signup
router.get('/signup', async(req, res, next) => {
    console.log('user router, singup.....')
    userDAO.signup({name: 'hong gil dong', email: 'hong@hong.com', password:'1234'}, (resp) => {
        res.send(resp)
    })
})

module.exports = router