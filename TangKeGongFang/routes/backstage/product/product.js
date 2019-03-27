let express = require('express');
let router = express.Router();
let DB = require('../../../model/db');
let fs = require('fs');
let ObjectId  = DB.ObjectId;

router.get('/',function (req,res,next) {
    DB.backStageFind('tkProduct',{},function (error,doc){
        // console.log(doc);
        console.log(1);
        res.render('product',{
            title:"商品列表",
            list:doc
        });
    });
});

router.get('/delete',function (req,res,next){

    //获取get路由  ？后的数据，用json形式传输到后端
    // console.log(req.query._id);
    let _id = req.query._id;



    DB.backStageFind('tkProduct',{'_id':new ObjectId(_id)},function (error,doc) {
        //解构赋值，然后用node自带的fs模块删除对应图片，然后数据库删除对应数据
        let {content_pic,title_pic} = doc[0];
        console.log(content_pic);
        fs.unlink(title_pic,function (err){
            if(err){
                console.log(err);
                return;
            }
        });
        content_pic.forEach(function (item) {
            fs.unlink(item,function (err){
                if(err){
                    console.log(err);
                    return;
                }
            })
        });
        
        DB.backStageDelete('tkProduct',{'_id':new ObjectId(_id)},function (error,result){
            // console.log(result[0]);
            // fs.unlink
            res.redirect('back');
        })
    });
    
});






module.exports = router;