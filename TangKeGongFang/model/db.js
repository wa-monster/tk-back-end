let MongoClient = require('mongodb').MongoClient;
let dbUel = 'mongodb://127.0.0.1:27017';

let ObjectId = require('mongodb').ObjectId;




//链接数据库函数  ，
function __connectDB(callback) {
    MongoClient.connect(dbUel,function (err,db){
        if(err){
            console.log("连接数据库失败");
            console.log(err);
            return;
        }
        console.log("连接数据库成功");
        callback(db);
    })
}

//(collectionsname,json,callback)
//列的名字 ，传入数据 ，回调



exports.ObjectId = ObjectId;

//增
exports.backStageInsert = function (collectionsname,json,callback){
    __connectDB(function (db){
        let backStageManage = db.db('backStage');

        backStageManage.collection(collectionsname).insert(json,function (error,result){
            if(error){
                console.log(error);
                return ;
            }
            callback(error,result);
            db.close();
        })
    })

};


//删
exports.backStageDelete = function(collectionsname,json,callback){
    __connectDB(function (db){
        let backStageManage = db.db('backStage');
        backStageManage.collection('tkProduct').remove(json,function (error,result) {
            if(error){
                console.log(error);
                console.log('删除数据出错');
                return;
            }
            callback(error,result);
            db.close();
        });

    })
};


//改
exports.backStageUpdate =function (collectionsname,json1,json2,callback) {
    __connectDB(function (db) {
        //连接集合
        let backStageManage = db.db('backStage');

        backStageManage.collection(collectionsname).update(json1,json2,function (error,result){
            if(error){
                console.log(error);
                console.log('更新出错');
                return ;
            }
            callback(error,result);
            db.close();
        });

    })
};

//查
exports.backStageFind =function (collectionsname,json,callback) {
    __connectDB(function (db) {
        //连接集合
        let backStageManage = db.db('backStage');

        let result = backStageManage.collection(collectionsname).find(json);
        result.toArray(function (error,doc) {
            if(error){
                console.log(error);
                return;
            }
            callback(error,doc);
            db.close();
        })
    })
};
