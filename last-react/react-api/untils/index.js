exports.checksome = function (req, res, next) {
    next()//代表执行完这个函数 继续执行下一个中间件
}

var crypto = require("crypto"); // node 模块 
// 加密函数
function aesEncrypt(data, key) {//加密函数 data是输入要加密的内容 key是秘钥
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

// 解密 
function aesDecrypt(encrypted, key) {//解密函数 第一个参数是要解密的内容 第二个是正确的秘钥
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
const keys = "wuhan1902daydayup";

exports.aesEncrypt = aesEncrypt;   // 加密
exports.aesDecrypt = aesDecrypt;   // 解密
exports.keys = keys;        // 密钥 




//错误提示 把错误提示发给前端
exports.setError = function (err, res, db) {
    if (err) {
        res.json({
            msg: "数据库或者服务器错误",
            code: 500,
            type: 10010//数据库错误特指
        })
        throw err;
    }
}



//检测后端token是否存在
exports.checkToken = function (req, res, next) {
    if (req.path !== "/vue/login" && req.path !== "/vue/register" && req.path !== "/vue/goodsidarr") {
        var client_token = req.headers.token;
        var server_token = req.session.token;

        // next()
        if (client_token) {
            if (server_token) {
                if (client_token == server_token) {
                    next() //执行下一步
                } else {
                    res.json({
                        msg: "token不匹配请重新登录",
                        code: 401
                    })
                }
            } else {
                res.json({
                    msg: "服务器token失效，请重新登录",
                    code: 401
                })
            }


        } else {
            res.json({
                msg: "当前未登录。请立即登录",
                code: 401
            })
        }
        // next()
    } else {
        next()
    }
}
exports.dateFormat = function (date) {
    var time = new Date(date);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var hour = time.getHours();
    var min = time.getMinutes();
    var second = time.getSeconds();
    return `${year}-${month}-${day} ${hour}:${min}:${second}`
}