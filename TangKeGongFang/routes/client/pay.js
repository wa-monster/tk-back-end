let express =require('express');

let router = express.Router();

let DB = require('../../model/db');

router.get('/',function (req,res){

});

router.get('/bbt',function (req,res){
    DB.backStageFind('tkProduct',{"classify":"bbt"},function (error,doc){
        res.json({code:200,list:doc});
    })
});

router.get('/nt',function (req,res){
    DB.backStageFind('tkProduct',{"classify":"nt"},function (error,doc){
        res.json({code:200,list:doc});
    })
});

router.get('/getimg',function (req,res){
    let type = req.query.type;
    DB.backStageFind('pageImg',{'type':type},function (error,doc) {
        if(doc.length === 0){
            res.json({code:200,empty:true});
        }else{
            res.json({code:200,list:doc});
        }

    });
});

router.get('/payPro',function (req,res){
    let proName = req.query.proName;
    proName.replace('/%20/g',' ');
    DB.backStageFind('tkProduct',{"title_en":proName},function (error,doc){
      if(doc.length === 0){
          res.json({code:200,empty: true});
      }else{
          res.json({code:200,list:doc})
      }
    })
});


module.exports = router;