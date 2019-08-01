import React, { Component } from 'react';
import './index.scss'
import aixos from "axios"
import { history } from "../../../utils/history"
import store from '../../store'
import { usernmae } from '../../action';
class Login extends Component {
    longin = () => {
        const tel = this.refs.one1.value;
        const pass = this.refs.one2.value;
        var mPattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
        if (mPattern.test(tel)) {
            aixos.post("/vue/login", { phone: tel, password: pass }).then(res => {
                console.log(res)
                if (!!res.data.type) {
                    sessionStorage.username = res.data.result[0].username
                    alert("登录成功,即将跳转首页")
                    store.dispatch(usernmae(false))
                    history.push("/")
                } else {
                    alert("密码错误")
                }
            })
        } else {
            alert("手机号错误")
        }
    }
    register = () => {
        history.push("/register")
    }
    render() {
        return (
            <div className="login-warp">
                <div className="login-hezi">
                    <p>
                        <label htmlFor="tell" maxlength='11'>手机号码：</label>
                        <input type="tel" id="tell" ref="one1" />
                    </p>
                    <p>
                        <label htmlFor="password">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
                        <input type="password" id="password" ref="one2" />
                    </p>
                    <button className="but-a-anniu" style={{
                        marginLeft: "124px",
                        marginTop: "20px"
                    }} onClick={this.longin}>登录</button>
                    <button className="but-a-anniu" style={{
                        marginLeft: "10px",
                        marginTop: "20px"
                    }} onClick={this.register}>注册</button>
                </div>
            </div>
        );
    }
}

export default Login;