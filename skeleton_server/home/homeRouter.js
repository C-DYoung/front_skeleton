var express = require('express');
var router = express.Router(); 

router.get('/', function(req, res, next){
    // index.html이 출력되면서 그곳에 {} 정보를 넘긴 것
    // nunjucks설정이 app.js에 되어져 있어야함. why? app.js가 엔트리 포인트라서
    res.render('index', {title: 'Express'}) 
});

module.exports = router