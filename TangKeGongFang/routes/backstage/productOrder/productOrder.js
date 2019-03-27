let express = require('express');

let router = express.Router();

let DB = require('../../../model/db');

router.get('/',function (req,res){
    //判断以导航active样式给谁
    //以及二级导航显示
    res.app.locals.navActive = 2;

    res.render('productOrder',{
        title:"订单",
    });

});

router.get('/allOrder',function (req,res,next){
    DB.backStageFind("evaluate",{},function (error,doc){
        resSendData(res,doc,'全部');
    });
});
router.get('/waitPay',function (req,res,next){
   DB.backStageFind('evaluate',{"state":0},function (error,doc){
       resSendData(res,doc,'待发货');
   })
});

router.get('/waitSend',function (req,res,next){
    DB.backStageFind('evaluate',{"state":1},function (error,doc){
        resSendData(res,doc,'运输中')
    })
});
router.get('/finished',function (req,res,next){
    DB.backStageFind('evaluate',{"state":2},function (error,doc){
        resSendData(res,doc,'已签收')
    })
});
router.get('/productClose',function (req,res,next){
    DB.backStageFind('evaluate',{"state":3},function (error,doc){
        resSendData(res,doc,'已关闭')
    })
});

function resSendData(res,doc,str){
    let list = "";
    if(doc.length <= 0){
        list = "数据库没有数据";
        res.json({code:200,state:"empty",list:list,str:str});
        return;
    }


    //js中 doc.reverse 会改变doc  ,
    doc.reverse();
    list=doc ;
    list.forEach(function (item) {
        switch (item.state) {
            case 0 :
                item.state = '待付款';
                break;
            case 1 :
                item.state = '待发货';
                break;
            case 2 :
                item.state = '已完成';
                break;
            case 3 :
                item.state = '已关闭';
                break;
            default :
                item.state = '错误，未知的订单状态';
                break;
        }


    });

    res.json({code:200,list:JSON.stringify(list),str:str});
}

module.exports = router;