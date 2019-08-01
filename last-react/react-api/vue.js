var express = require("express");

var router = express.Router();
var { waterfall } = require("async");
var { conn } = require("./untils/db");
var { setError, aesEncrypt, keys, aesDecrypt } = require("./untils/index");
var { user, Web, Book, xingqs, Code } = require("./untils/schema");
var util = require('./config/index.js');

router.get("/index", (req, res) => {
  res.json({
    msg: "这是vue项目后台的路由",
    code: 200
  });
});

//注册接口
router.post("/register", (req, res) => {
  var body = req.body;
  var username1 = body.username;
  conn((err, mongoose) => {
    setError(err, res, mongoose);
    user.find({ username: username1 }).exec((err, result) => {
      setError(err, res, mongoose);
      if (result[0]) {
        res.json({
          type: 0,
          msg: "当前用户名已存在，请重新注册",
          code: 200
        });
        mongoose.disconnect();
      } else {
        user.insertMany(body, (err, result) => {
          setError(err, res, mongoose);
          res.json({
            type: 1,
            msg: "注册成功",
            code: 200
          });
          mongoose.disconnect();
        });
      }
    });
  });
});


//修改个人资料
router.post("/xiugaiziliao", (req, res) => {
  var _id = req.body.b
  var c = req.body.c
  conn((err, mongoose) => {
    setError(err, res, mongoose);
    user.updateOne({ _id: _id }, {
      $set: {
        c: c
      }
    }, (err, result) => {
      setError(err, res, mongoose);
      res.json({
        msg: "寄语修改成功",
        type: 1,
        result
      });
      mongoose.disconnect()
    })
  })
})


//登录路由
router.post("/login", (req, res) => {
  var a = req.body.phone;
  var b = req.body.password;
  var token = aesEncrypt(a, keys);
  req.session.token = token; //把token存入到session中
  conn((err, mongoose) => {
    setError(err, res, mongoose);
    user.find({ phone: a, password: b }, {}).exec((err, result) => {
      setError(err, res, mongoose);
      if (result[0]) {
        res.json({
          msg: "登录成功",
          type: 1,
          code: 200,
          token,
          result
        });
        mongoose.disconnect();
      } else {
        res.json({
          msg: "用户名或者密码错误",
          type: 0,
          code: 200
        });
        mongoose.disconnect();
      }
    });
  });
});


//修改博主信息
router.post("/userxiugai", (req, res) => {
  var obj = req.body.data
  var phone = obj.phone
  var password = obj.password
  conn((err, mongoose) => {
    setError(err, res, mongoose);
    user.updateOne({ username: "hz1282" }, { $set: { phone: phone, password: password, passwords: password, } }, (err, result) => {
      setError(err, res, mongoose);
      res.json({
        msg: "数据获取成功",
        type: 1,
        result
      });
      mongoose.disconnect()
    })
  })
})

//修改寄语
router.get("/userjiyu", (req, res) => {
  var jiyu = req.query.jiyu
  conn((err, mongoose) => {
    setError(err, res, mongoose);
    user.updateOne({ username: "hz1282" }, {
      $set: {
        jiyu: jiyu
      }
    }, (err, result) => {
      setError(err, res, mongoose);
      res.json({
        msg: "寄语修改成功",
        type: 1,
        result
      });
      mongoose.disconnect()
    })
  })
})
//获取寄语
router.get("/userjiyuhuoqu", (req, res) => {
  conn((err, mongoose) => {
    setError(err, res, mongoose);
    user.find({ username: "hz1282" }, (err, result) => {
      setError(err, res, mongoose);
      res.json({
        msg: "数据获取成功",
        type: 1,
        result
      });
      mongoose.disconnect()
    })
  })
})


//上传头像

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./public/avatar");
  },
  filename: function (req, file, cb) {
    //修改上传文件的名称
    cb(null, Date.now() + "wh" + file.originalname); //
  }
});


const upload = multer({ storage }).any(); //任何格式的文件都可以
router.post("/upload", upload, (req, res) => {
  console.log(req.files)
  var avatarurl = req.files[0].path;
  // var username = aesDecrypt(req.session.token, keys);
  // console.log(username)
  conn((err, db) => {
    setError(err, res, db);
    user.updateOne(
      { username: "hz1282" },
      {
        $set: {
          avatar: avatarurl
        }
      },
      (err, result) => {
        setError(err, res, db);
        res.json({
          msg: "图片上传成功",
          avatarurl,
          result
        });
        db.disconnect()
      }
    );
  });
});





//获取数据web
router.get("/webcontet", (req, res) => {
  conn((err, mongoose) => {
    setError(err, res, mongoose);
    Web.find().exec((err, result) => {
      setError(err, res, mongoose);
      res.json({
        msg: "数据获取成功",
        code: 200,
        result
      })
      mongoose.disconnect();
    })
  })
})

//增加数据web
router.get("/webcontetxinzeng", (req, res) => {
  var obj = req.query
  var consten = obj.consten
  var title = obj.title
  var time = obj.time
  var cart = obj.cart
  var id = obj.id || ""
  console.log(id)
  if (id) {
    console.log(id, 2)
    conn((err, mongoose) => {
      setError(err, res, mongoose);
      waterfall([
        (cb) => {
          Web.findOne({ _id: id }, (err, result) => {
            cb(err, result)
          })
        },
        (args, cb) => {
          Web.updateOne(
            { _id: id },
            {
              $set: {
                consten, title, cart, time
              }
            },
            (err, result) => {
              setError(err, res, mongoose);
              res.json({
                msg: "数据修改成功",
                args
              });
              mongoose.disconnect()
            }
          );
        }
      ])
    })
  } else {
    console.log(id, 1)
    conn((err, mongoose) => {
      setError(err, res, mongoose);
      Web.insertMany                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           (obj, ((err, result) => {
        setError(err, res, mongoose);
        res.json({
          msg: "数据新增成功",
          code: 200,
          result
        })
        mongoose.disconnect();
      }))
    })
  }
})

//获取数据详情页
router.get("/webcontetxiqs", (req, res) => {
  var id = req.query._id
  conn((err, mongoose) => {
    setError(err, res, mongoose);
    Web.find({ _id: id }, (err, result) => {
      setError(err, res, mongoose);
      res.json({
        msg: "数据获取成功",
        code: 200,
        result
      })
      mongoose.disconnect();
    })
  })
})

//获取数据详情页
router.get("/webcontetxiq", (req, res) => {
  var id = req.query.id
  conn((err, mongoose) => {
    setError(err, res, mongoose);
    Web.find({ _id: id }, (err, result) => {
      setError(err, res, mongoose);
      res.json({
        msg: "数据获取成功",
        code: 200,
        result
      })
      mongoose.disconnect();
    })
  })
})

//获取留言信息
router.get("/bookshuoqu", (req, res) => {
  var getaa = req.query.getaa
  conn((err, mongoose) => {
    setError(err, res, mongoose);
    waterfall([
      (cb) => {
        Book.find({}, (err, result) => {
          cb(err, result.length)
        })
      },
      (args, cb) => {
        var li = Math.ceil(args / 10)
        Book.find().skip(10 * (li - getaa - 1)).limit(10).exec((err, result) => {
          setError(err, res, mongoose);
          res.json({
            args,
            msg: "数据获取成功",
            type: 1,
            result
          });
          mongoose.disconnect()
        })
      }
    ])
  })
})



//新增留言信息
router.get("/booksinse", (req, res) => {
  var obj = req.query
  conn((err, db) => {
    setError(err, res, db);
    Book.insertMany(obj, (err, result) => {
      setError(err, res, db);
      res.json({
        msg: "数据获取成功",
        type: 1,
        result
      });
      db.disconnect()
    })
  })
})
//删除日志信息
router.get("/booksinssdfe", (req, res) => {
  console.log(req.query, 555)
  var _id = req.query._id
  conn((err, db) => {
    setError(err, res, db);
    Web.remove({ _id: _id }).exec((err, result) => {
      setError(err, res, db);
      res.json({
        msg: "数据获取成功",
        type: 1,
        result
      });
      db.disconnect()
    })
  })
})

//sc                      
router.get("/booksindse", (req, res) => {
  var id = req.query._id
  console.log(id)
  conn((err, db) => {
    setError(err, res, db);
    Book.remove({ _id: id }, (err, result) => {
      setError(err, res, db);
      res.json({
        msg: "数据获取成功",
        type: 1,
        result
      });
      db.disconnect()
    })
  })
})
//新增说说心情信息
router.get("/xingqix", (req, res) => {
  var obj = req.query
  conn((err, db) => {
    setError(err, res, db);
    xingqs.insertMany(obj, (err, result) => {
      setError(err, res, db);
      res.json({
        msg: "数据获取成功",
        type: 1,
        result
      });
      db.disconnect()
    })
  })
})
router.get("/xingqixsuoyou", (req, res) => {
  var getaa = req.query.getaa
  conn((err, mongoose) => {
    setError(err, res, mongoose);
    waterfall([
      (cb) => {
        xingqs.find({}, (err, result) => {
          cb(err, result.length)
        })
      },
      (args, cb) => {
        var li = args - 30 * getaa
        if (li < 0) {
          li = 0
        }
        xingqs.find().skip(li).limit(30 * getaa).exec((err, result) => {
          setError(err, res, mongoose);
          res.json({
            args,
            msg: "数据获取成功",
            type: 1,
            result
          });
          mongoose.disconnect()
        })
      }
    ])
  })
})


//修改留言信息
router.get("/bookupdeda", (req, res) => {
  var id = req.query._id
  var content = req.query.content
  conn((err, db) => {
    setError(err, res, db);
    Book.updateOne({ _id: id }, {
      $set: {
        content: content
      }
    }).exec((err, result) => {
      setError(err, res, db);
      res.json({
        msg: "数据获取成功",
        type: 1,
        result
      });
      db.disconnect()
    })
  })
})


function getCode() {
  return 1000 + Math.round(Math.random() * 8000)
}

//发送验证码
router.post('/sendCode', function (req, res, next) {
  console.log(222, req.body);
  const mobile = req.body.mobile; //需要发送的号码
  console.log(mobile)
  var code = getCode() //需要发送的验证码
  if (mobile == '') {

    res.json({
      msg: '手机号不能为空',
      code: 200
    });
    return
  }
  util.getResult(code, mobile).then(function (response) {
    console.log(response.data);
    console.log(response.data.code);
    if (response.data.code == '000000') {
      conn((err, db) => {
        setError(err, res, db);

        waterfall([
          (callback) => {
            Code.findOne({ mobile, code }, (err, result) => {
              callback(err, result)
            })
          },
          (arg, callback) => {
            if (arg) {
              Code.updateOne({
                mobile,
                code
              }, {
                  $set: {
                    time: new Date().getTime()
                  }
                }, (err, result) => {
                  callback(err, result)
                })
            } else {
              Code.create({ mobile, code, time: new Date().getTime() }, (err, result) => {
                callback(err, result)
              })
            }
          }
        ], (err, result) => {
          console.log(result)
          setError(err, res, db);
          res.json({
            msg: "验证码发送成功",
            result: code,
            code: 200
          })
          db.disconnect();
        })
      })

    } else {

      res.json({
        msg: "请求失败,无法发送",
        code: 200
      })
    }


  }, function (err) {
    console.log(err);
    res.json({
      msg: "发送异常，无法发送"
    })
  })

});



//测试验证码是否有效
router.post("/checkCode", (req, res) => {
  var body = req.body;
  var mobile = body.mobile;
  var code = body.code * 1 || "";
  console.log(1, mobile, 2, code)
  conn((err, db) => {
    setError(err, res, db);
    Code.findOne({ code, mobile }, (err, result) => {
      setError(err, res, db)
      console.log(result, 5555)
      if (result) {
        var time = new Date();
        console.log(1111, result)
        var nn = time - result.time
        console.log("nn", nn)
        if (time - result.time < 60 * 1000 * 5) {
          var token = aesEncrypt(mobile, keys);
          res.json({
            msg: "验证通过,验证码有效!",
            code: 200,
            type: 1,
            token
          })
        } else {
          res.json({
            msg: "验证码失效",
            code: 200,
            type: 0
          })
        }
      } else {
        res.json({
          msg: "验证失败,验证码错误",
          code: 200,
          type: 0
        })
      }
      db.disconnect();
    })
  })
})

module.exports = router;
