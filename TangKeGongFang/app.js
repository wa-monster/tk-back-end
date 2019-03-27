let express = require('express');
let cors = require('cors');
let app = express();
let router = require('./routes');

//cors模块解决跨域
//设置视图模板
app.set('view engine','ejs');

app.use(cors());
//设置静态资源目录
app.use(express.static('public'));
app.use('/developer/upload',express.static('upload'));
app.use('/upload',express.static('upload'));
app.use('/developer/product/upload',express.static('upload'));

app.use('/upload2',express.static('upload2'));
app.use('/developer/upload2',express.static('upload2'));

app.use('/upload3',express.static('upload3'));

router(app);


app.listen(3000);
console.log('监听在3000端口')