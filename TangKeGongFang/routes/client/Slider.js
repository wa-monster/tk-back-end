let express = require('express');

let router = express.Router();

let DB = require('../../model/db.js');

router.get('/',function(req,res){
	DB.backStageFind("Slider",{},function(error,doc){
		let sliderArr = doc[0].img;
		sliderArr = sliderArr.map(function(item){
			return item = "http://www.yangduoduo.xyz/"+item;
		});
		// console.log(sliderArr);
		res.json({code:200,slider:sliderArr});
	})
});

module.exports = router;