let express = require('express');
let router = express.Router();

let DB = require('../../../model/db');

let ObjectId  =  DB.ObjectId;


router.get('/',function (req,res,next) {
    let _id = req.query._id;
    console.log(req.query);
    // res.send("123");
    DB.backStageFind('tkProduct',{'_id':new ObjectId(_id)},function (error,doc) {
        res.render('productDetail', {
            title: "商品详情",
            list:doc
        })
    });

});

router.get('/productItro',function (req,res,next){
    let _id = req.query._id;
    DB.backStageFind('tkProduct',{'_id':new ObjectId(_id)},function (error,doc){
        console.log('产品介绍加载成功');
        res.json({code:200,list:doc[0].content_pic});
    })
});


router.get('/evaluate',function (req,res,next){
    // DB.backStageFind('evaluate',{'id':id},function (error,doc){
    //
    // });
    res.json({code:200,list:['123123123','456456456','789789789']});
});


module.exports = router;