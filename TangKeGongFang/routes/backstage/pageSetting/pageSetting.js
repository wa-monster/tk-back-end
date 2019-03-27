let express = require('express');
let router = express.Router();
let DB = require('../../../model/db');

router.get('/',function (req,res){
    res.app.locals.navActive=3;

    DB.backStageFind('Slider',{},function (error,doc) {
       let list = doc[0];
        res.render('pageSetting',{
            title:"页面设置",
            list:list
        });
    });

});

//页面设置，首页轮播图
router.use('/Slider',require('./Slider'));
router.use('/pageProduct',require('./pageProduct'));

module.exports=router;