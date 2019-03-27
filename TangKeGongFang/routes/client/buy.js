let express =require('express');

let router = express.Router();

let DB = require('../../model/db');

router.post('/',function (req,res){
    let buysInfo = req.body;
    let orderNum = new Date().getTime();
    let time = new Date().toLocaleTimeString();
    time = new Date().toLocaleDateString() +" " + time;
    buysInfo.orderNum =orderNum;
    buysInfo.downTime = time;
    buysInfo.state = 1;
    console.log(time);
    DB.backStageInsert('evaluate',buysInfo,function (err,result){
        res.json({code:200,str:"插入成功"});
    });
});


module.exports = router;