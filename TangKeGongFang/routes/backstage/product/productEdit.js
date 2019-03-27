const express = require('express');
const router = express.Router();
const DB = require('../../../model/db');
const multiparty = require('multiparty');
const fs = require('fs');

let ObjectId = DB.ObjectId;
let _id =null;

router.get('/',function (req,res,next){
    let id = req.query._id;
    _id = id;
    DB.backStageFind('tkProduct',{'_id':new ObjectId(_id)},function (error,doc){
        let list= doc;
        DB.backStageFind('productClass',{},function(error,result) {
            let arr = [...result]
            res.render('productEdit',{
                title:"产品修改",
                list,
                arr
            })
        })
    });

});

let content_pic = [];
router.post('/upDate',function (req,res) {
    let form = new multiparty.Form();
    form.uploadDir = 'upload';

    form.parse(req,function (err,fields,files) {
        if(err){
            console.log(err);
            return;
        }


        let title_zh= fields.titleZh[0];
        let title_en= fields.titleEn[0];
        let classify = fields.classify[0];

        let sketch_zh= fields.sketchZh[0];
        let sketch_en= fields.sketchEn[0];
        let stock_zh = fields.stockZh[0];
        let price = fields.price[0];
        let code = fields.code[0];
        let last_pic = fields.last_pic[0];

        let originalFilename = files.pic[0].originalFilename;
        let title_pic = files.pic[0].path;

        if(originalFilename === ''){
            fs.unlink(form.uploadDir+'/'+title_pic,function (err) {
                
            });
            title_pic = last_pic;
        }

        let json2 = {
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
        };
        
        DB.backStageUpdate('tkProduct',{'_id':new ObjectId(_id)},{$set:json2},function (error,result){
            console.log('修改信息成功');
            res.redirect('/developer');
        })

    })
});
router.post('/addpic',function (req,res) {
    DB.backStageFind('tkProduct',{'_id':new ObjectId(_id)},function (error,doc){
        let _pic = doc[0].content_pic;
        content_pic = _pic;
        let form = new multiparty.Form();
        form.uploadDir = 'upload';
        form.parse(req,function (err,fields,files){
            if(err){
                console.log(err);
                console.log('上传图片失败');
                return;
            }
            let uploadPic = files.file[0].path;
            content_pic.push(uploadPic);
            res.json({code:200,filePath:uploadPic});
        })
    })
});



module.exports = router;