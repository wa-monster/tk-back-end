let express = require('express');
let router = express.Router();
let multiparty = require('multiparty');
let bodyParser = require('body-parser');
let DB = require('../../../model/db');

let jsonParser = bodyParser.json();

router.get('/',function (req,res){
   req.app.locals.navActive =3;
    DB.backStageFind('pageImg',{},function (error,doc) {
        if(doc.length === 0){
            res.render('pageProduct',{
                title:"页面设置",
                list:false
            });
        }else{
            res.render('pageProduct',{
                title:"页面设置",
                list:doc
            });
        }

    });
});


router.post('/addpic',function (req,res){

    let form = new multiparty.Form();
    form.uploadDir = 'upload3';
    form.parse(req,function (err,fields,files){
        if(err){
            console.log(err);
            console.log('图片上传错误');
            return ;
        }

        // console.log(files);
        let title_pic = req.app.locals.localhttp+files.file[0].path;
        // console.log(title_pic);
        req.app.locals.imgnews = {
            path:title_pic
        };
        console.log(req.app.locals.imgnews);
        res.json({code:200});

    });
});

router.post('/addtype',jsonParser,function (req,res){
    console.log(req.body);
    console.log('addtype');
    let addtype = req.body;
    console.log(req.body);
    console.log('addtype');
    req.app.locals.imgnews.type = addtype.type;
    DB.backStageInsert('pageImg',req.app.locals.imgnews,function (error,doc){
        console.log("加入成功");
        //如果不写res.json。multiparty会自动删除上传的图片
        res.json({code:200,a:addtype});
    });
});



module.exports=router;