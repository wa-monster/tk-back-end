let express = require('express');
let router = express.Router();
let multiparty = require('multiparty');
let DB = require('../../../model/db');

let ObjectId = DB.ObjectId;


router.post('/addpic',function (req,res){
    let form = new multiparty.Form();
    form.uploadDir = 'upload2';
    form.parse(req,function (err,fields,files){
        if(err){
            console.log(err);
            console.log('图片上传错误');
            return ;
        }

        // console.log(files);
        let title_pic = files.file[0].path;
        console.log(title_pic);

        let _id = req.query._id;
        DB.backStageFind('Slider',{'_id':new ObjectId(_id)},function (error,doc){
            let arr = doc[0].img;
            arr.push(title_pic);
            console.log(arr);
            DB.backStageUpdate('Slider',{},{$set:{img:arr}},function (){
                console.log("更新成功");
                //如果不写res.json。multiparty会自动删除上传的图片
                res.json({code:200,img:title_pic});
            })
        });
    });
});
router.post('/delpic',function(req,res) {
    let s = req.body;
    let _id = req.query._id;
    DB.backStageFind('Slider',{'_id':new ObjectId(_id)},function(error,doc){
            console.log(doc[0])
            let arr = [...doc[0].img];
            arr.splice(s.imgIndex,1)
            DB.backStageUpdate('Slider',{},{$set:{img:arr}},function (){
                console.log("更新成功");
                res.json({code:200,s})
            })
        }
    )
})


module.exports=router;