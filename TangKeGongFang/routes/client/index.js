let express = require('express');

let router = express.Router();

router.get('/',function(req,res){
	res.render("index")
});

router.use('/Slider',require('./Slider'));
router.use('/pay',require('./pay'));
router.use('/buy',require('./buy'));


module.exports = router;