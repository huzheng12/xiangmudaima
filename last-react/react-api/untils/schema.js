var mongoose = require("mongoose");


//登录注册信息表
var user_schema = new mongoose.Schema({
    phone: String, username: String, password: String,
    passwords: String, times: String, mailbox: String,
    shengri: String, jiyu: String, aihao: Array, img: String, avatar: String
})
var user = mongoose.model("user", user_schema);
exports.user = user;

//手机验证
var code_schema = new mongoose.Schema({ mobile: String, time: Date, code: Number })
var Code = mongoose.model("code", code_schema)
exports.Code = Code


//电影数据库
var mongoose = require("mongoose");
var movie_schema = new mongoose.Schema({ title: String, images: Object, directors: Object, rating: Object, genres: Array, id: String });
var movie = mongoose.model("movie", movie_schema);
exports.movie = movie;



//评论数据库
var pinglun_schema = new mongoose.Schema({ title: String, content: String, username: String, uid: String, mtitle: String, time: Date, movie: Object, img: String, year: String })
var pinglun = mongoose.model("pinglun", pinglun_schema);
exports.pinglun = pinglun

//商品列表
var goods_schema = new mongoose.Schema({ lirr: Boolean, price: Number, discount: Number, id: String, type: Object, img: String, name: String, _id: String })
var good = mongoose.model("good", goods_schema);
exports.good = good

//购物车列表
var cart_schema = new mongoose.Schema({ lirr: Boolean, username: String, goods: Object, selectedNum: Number, price: Number, id: String })
var cart = mongoose.model("cart", cart_schema);
exports.cart = cart;

//购物车列表
var text_schema = new mongoose.Schema({ lirr: Boolean, username: String, arr: Array, selectedNum: Number, price: Number, id: String })
var text = mongoose.model("text", text_schema);
exports.text = text;

//评论数据库
var pinlll_schema = new mongoose.Schema({ title: String, content: String, time: Number })
var pinlll = mongoose.model("pinlll", pinlll_schema);
exports.pinlll = pinlll


//轮播图
var swiper_schema = new mongoose.Schema({ title: String, img: String })
var swiper = mongoose.model("swiper", swiper_schema);
exports.swiper = swiper

//验证码
var Code_schema = new mongoose.Schema({ mobile: Number, code: Number, time: Date })
var Code = mongoose.model("Code", Code_schema);
exports.Code = Code

//web
var Web_schema = new mongoose.Schema({ title: String, consten: String, time: String, name: String, cart: String })
var Web = mongoose.model("Web", Web_schema);
exports.Web = Web

//liuyanban
var book_schema = new mongoose.Schema({ content: String, username: String, time: String, img: String, num: Number })
var Book = mongoose.model("Book", book_schema);
exports.Book = Book
//liuyanban
var xingqs_schema = new mongoose.Schema({ content: String, username: String, time: String, img: String, num: Number })
var xingqs = mongoose.model("xingqs", xingqs_schema);
exports.xingqs = xingqs
