var mongoose = require("mongoose");
const hostname = '0.0.0.0';
const port = 27017;
const dbname = "blog";
const CONN_DB_STR = `mongodb://${hostname}:${port}/${dbname}`;
exports.conn = function (callback) {
    mongoose.connect(CONN_DB_STR, { useNewUrlParser: true }, err => {
        if (err) {
            callback(err, null)
        } else {//得到连接成功的mongoose对象 
            console.log("数据库链接成功")
            callback(null, mongoose)
        }
    })
}
const dbnames = "wh1902";
const CONN_DB_STRS = `mongodb://${hostname}:${port}/${dbnames}`;
exports.conns = function (callback) {
    mongoose.connect(CONN_DB_STRS, { useNewUrlParser: true }, err => {
        if (err) {
            callback(err, null)
        } else {//得到连接成功的mongoose对象 
            console.log("数据库链接成功")
            callback(null, mongoose)
        }
    })
}
