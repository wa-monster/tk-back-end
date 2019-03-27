let express = require('express');
let MD5 = require('md5-node');

let DB =require('../../../model/db');

let router = express.Router();

router.get('/',function (req,res,next) {
    res.render('login')
});

router.post('/',function (req,res,next) {
    let user= req.body.user;
    let pwd = req.body.pwd;
    console.log(typeof pwd);
    let loginJson = {
        "user":user,
        "pwd":MD5(pwd)
    };
   DB.backStageFind('user',loginJson,function (error,doc) {
       if(doc.length>0){
           req.session.userInfo = doc[0];
           res.redirect('/developer/product');
       }else{
           console.log('错误');
       }
   })
});

router.get('/quit',function (req,res,next){
   //销毁session
   req.session.destroy(function (err){
       if(err){
           console.log(err);
       }else{
           res.redirect('/developer/login');
       }
   })
});


module.exports = router;