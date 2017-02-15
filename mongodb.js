/**
 * Created by 24965 on 2017/2/11.
 */
var mongodb=require("mongodb").MongoClient;
var db_str="mongodb://60.205.212.43:27017/users";
exports.insert_data=function (data) {
    var insertdata=function (db,callback) {
        var collection=db.collection('users');
        collection.insert(data,function (err,result) {          //data:对象数组
            if(err)
                console.log(err);
            else
                callback(result);
        });
    }
    mongodb.connect(db_str,function (err,db) {
        if(err)
        {
            console.log(err.toString());
        }
        else
        {
            console.log("链接成功");
            insertdata(db,function (result) {
                console.log(result);
            });
        }
    });
};
exports.find_data=function (data,callback) {         //data是object
    var select_data=function (db,callback) {
        var collection = db.collection('users');
        collection.find(data).toArray(function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            else {
                callback(result);
            }
        });
    };
        mongodb.connect(db_str,function (err,db) {
            if(err)
                console.log(err);
            else {
                console.log("连接成功");
                select_data(db, function (result) {
                    console.log(result);
                    callback(result);
                    db.close();
                })
            }
        });
};


