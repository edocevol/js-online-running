var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'js在线编辑-运行平台' });
});

module.exports = router;
