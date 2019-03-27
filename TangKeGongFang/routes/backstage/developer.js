let express = require('express');

let router = express.Router();

router.use(function (req,res,next) {
    if(req.url!=='/login'){
        if(req.session.userInfo &&req.session.userInfo !==''){
            //如果实在路由里得用req.app.locals，如果在app.js或者暴露了app变量的用app.locals
            req.app.locals["userInfo"] = req.session.userInfo;
            req.app.locals.navActive = 1;
            req.app.locals.localhttp = 'http://localhost:3000/';
            next();
        }else{
            res.redirect('/developer/login');
        }

    }else{
        next();
    }
}) ;


router.get('/',function (req,res,next) {

   res.redirect('/developer/product');
});


//product
router.use('/product',require('./product/product'));

router.use('/productAdd',require('./product/productAdd'));

router.use('/productDetail',require('./product/productDetail'));

router.use('/productEdit',require('./product/productEdit'));

router.use('/productClass',require('./product/productClass'));

router.use('/login',require('./product/login'));




//productOrder
router.use('/productOrder',require('./productOrder/productOrder'));

router.use('/pageSetting',require('./pageSetting/pageSetting'));


module.exports = router;