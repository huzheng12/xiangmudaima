import React, { Component } from 'react';
import './index.scss'
import aixos from "axios"
import { history } from "../../../utils/history"
import store from '../../store'

class Register extends Component {
    longin = () => {
        alert("即将前往登录页")
        history.push('/login')
    }
    register = () => {
        var time = new Date();
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var day = time.getDate();
        var hour = time.getHours();
        var min = time.getMinutes();
        var second = time.getSeconds();
        // console.log(`${year}-${month}-${day} ${hour}:${min}:${second}`)
        var time = `${year}-${month}-${day} ${hour}:${min}:${second}`

        var phone = this.refs.one1.value;
        var username = this.refs.one3.value;
        var password = this.refs.one2.value;
        var passwords = this.refs.one4.value;
        var reg = /^1(3|5|6|7|8|9)[0-9]{9}$/
        var usernameww = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){5,19}$/
        var passwordEgt = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._@$]){5,11}$/
        if (!reg.test(phone)) { return }
        if (!usernameww.test(username)) { return }
        if (!passwordEgt.test(password)) { return }
        if (!(password === passwords)) { return }
        console.log(this.props.time)
        const obj = {
            phone, username, password, passwords, time
        }
        aixos.post('/vue/register', obj).then(res => {
            console.log(res)
            if (!!res.data.type) {
                alert("即将前往登录页")
                history.push('/login')

            } else {
                alert("手机号已被注册")
            }
        })
    }
    render() {
        return (
            <div className="register-warp">
                <div className="login-hezi">
                    <p style={{ position: "relative" }}>
                        <label htmlFor="tell">手机号码：</label>
                        <input type="tel" id="tell" ref="one1" maxlength='11' />
                        <span className="dengwei-text">请输入正确的手机号吗</span>
                    </p>
                    <p style={{ position: "relative" }}>
                        <label htmlFor="username">用&nbsp;户&nbsp;名：</label>
                        <input type="text" id="username" ref="one3" />
                        <span className="dengwei-text">6-20位首字母开头的用户名</span>

                    </p>
                    <p style={{ position: "relative" }}>
                        <label htmlFor="password">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
                        <input type="password" id="password" ref="one2" />
                        <span className="dengwei-text">6-12位首字母开头的密码</span>

                    </p>
                    <p style={{ position: "relative" }}>
                        <label htmlFor="passwords">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
                        <input type="password" id="passwords" ref="one4" />
                        <span className="dengwei-text">请输入以上密码</span>

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
        )
    }
}

export default Register;