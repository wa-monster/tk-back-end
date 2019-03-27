let bodyParser = require('body-parser');
let session = require('express-session');


module.exports = function (app) {
  app.use(session({
    //加密方式
    secret:'keyboard cat',
    //  session未修改也要保存
    resave:false,
      //未初始化session强制储存
     saveUninitialized:true,
     cookie:{
        //最大过期时间
        maxAge:1000*60*30
     },
      //在断开连接后计算过期时间
     rolling:true
  }));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  //后台路由
   /*
    req.query获取get 的参数，req.url获取路由

    */

  let developer = require('./backstage/developer');
	let index = require('./client/index');
	
	app.use('/',index);
  app.use('/developer',developer);



};