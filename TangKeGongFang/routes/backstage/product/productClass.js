let express = require('express');
let router = express.Router();
let multiparty = require('multiparty');
let bodyParser = require('body-parser');
let DB = require('../../../model/db');
let ObjectId = DB.ObjectId;

router.get('/',function(req,res) {
    res.render('productClass',{
        title:'添加分类'
    })
})

router.post('/',function(req,res) {
    let data = req.body
    DB.backStageInsert("productClass",data,function(error,result) {
        console.log(result)
        res.json({code:200,data})
    })
})

module.exports = router
