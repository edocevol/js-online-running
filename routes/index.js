var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'js在线编辑-运行平台' });
});


router.get('/addCount',function (req,res,next) {
    var fs = require('fs');
    var count = fs.readFileSync(path.join(__dirname,'count'),'utf-8');
    count = parseInt(count);
    count=count+1;
    fs.writeFile(path.join(__dirname,'count'),count,function (err) {

    });
    res.json({"code":count});
})

router.get('/getCount',function (req,res,next) {
    var fs = require('fs');
    var count=0;
    fs.readFile(path.join(__dirname,'count'),'utf-8',function (err,data) {
        if(err){
            count=0;
        }
        count=parseInt(data);
        res.json({"code":count});
    });

})
module.exports = router;
