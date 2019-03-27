let express = require('express');
let router = express.Router();
let multiparty = require('multiparty');
let DB = require('../../../model/db');


//上传图片s数组
let content_pic = [];

router.get('/',function (req,res,next) {
    DB.backStageFind('productClass',{},function (error,doc){
        // console.log(doc)
        let arr = [...doc]
        res.render('productAdd',{
            title:"商品增加",
            list:arr
        });
    });

});



router.post('/',function (req,res,next) {
    let form = new multiparty.Form();
    form.uploadDir = 'upload';
    form.parse(req,function (err,fields,files) {
        if(err){
            console.log(err);
            console.log('图片上传错误');
            return ;
        }
        //打印上传的信息
        // console.log('/');
        // console.log(fields);
        // console.log(files);
        let title_zh= fields.titleZh[0];
        let title_en= fields.titleEn[0];
        let classify = fields.classify[0];

        let sketch_zh= fields.sketchZh[0];
        let sketch_en= fields.sketchEn[0];
        let stock_zh = fields.stockZh[0];
        let price = fields.price[0];
        let code = ""+(new Date().getTime());
        code = code.substr(-8)
        let title_pic = files.pic[0].path;

        DB.backStageInsert('tkProduct',{
            title_zh,
            title_en,
            classify,
            sketch_zh,
            sketch_en,
            stock_zh,
            price,
            code,
            title_pic,
            content_pic
        },function (error,result) {
            console.log('插入数据成功');
            res.redirect('/developer');
        })

    })
});
router.post('/addpic',function (req,res,next) {
    // console.log(req.body);
    let form = new multiparty.Form();
    form.uploadDir = 'upload';
    form.parse(req,function (err,fields,files) {
        if(err){
            console.log(err);
            console.log('图片上传错误');
            return ;
        }
        //打印上传的信息
        // console.log('/addpic');
        // console.log(fields);
        console.log(files);
        content_pic.push(files.file[0].path);
        res.json({
            code:200,
            filePath:files.file[0].path
        });
    })
});


module.exports = router;