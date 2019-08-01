

var express = require("express");
var app = express();

var http = require("http");
var https = require('https');
var fs = require("fs");
//app是一个大的对象
//app.use 使用中间件
//app.set 设置中间件
//app.get get请求
//app.post post请求
var hostname = "0.0.0.0";
var port = 1902;
var vues = require("./vues.js")//引入vue.js文件
var vue = require("./vue.js")//引入vue.js文件
var privateKey = fs.readFileSync('./cert/hz.key', 'utf8');
var certificate = fs.readFileSync('./cert/hz.pem', 'utf8');
var credentials = { key: privateKey, cert: certificate };
var httpsServer = https.createServer(credentials, app);
// var httpServer = http.createServer(app);
// var server = require("http").Server(app)
var session = require("express-session")
app.use(session({  //引入之后cnpm i express-session -S 下载
    secret: "test",
    name: "appTest",
    cookie: { maxAge: 60 * 60 * 1000 },//会话时间 超过这个时间就会自动注销
    resave: false,
    saveUninitialized: true
}));


app.use(express.static("public")) //设置服务器的静态文件目录 透明化
var { checkToken } = require("./untils")
//app.use(checkToken)
// app.get("/index/:uid",(req,res)=>{//params传参是由冒号声明的
//     res.json({
//         msg:"获取数据成功",
//         type:1,
//         code:200,
//         uid:req.params.uid
//     })
// })

app.use(express.json());   // req.body 获取 post  请求提交的 POSTData    $.post
app.use(express.urlencoded({ extended: false }));  //  form method="POST"  

//处理跨域
app.all('*', function (req, res, next) {
    // res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    next();
});
app.use("/vue", vue)//设置路由中间件 添加路由别名
app.use("/vues", vues)//设置路由中间件 添加路由别名

httpsServer.listen(port, hostname, () => {
    // console.log(`my server is runing at http://${hostname}:${port}`)
})
