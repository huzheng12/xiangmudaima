import React, { Component } from 'react';
import axios from 'axios'
import './index.scss'
import {history} from "../../../utils/history"
class Tempe extends Component {
    state = {
        arr: {},
        flg: true,
        content: "",
        img:require("../../img/t1.jpeg")
    }
    componentWillMount() {

        if (sessionStorage.username) {
            if(sessionStorage.username=="hz1282"){

            }else{
                alert("请申请博主同意方可观看")
                history.push("/")
            }
        } else {
            alert("请登录")
            history.push("/")
        }

    }
    componentDidMount() {
        axios.get("/vue/userjiyuhuoqu").then(res => {
            console.log(res.data.result[0],888)
            var fat = res.data.result[0].avatar.replace(/public/, '');
            fat = fat.replace(/\\/ig, '/');
            var a = "http://47.102.135.185:2019"+fat
            this.setState({
                arr: res.data.result[0],
                img:a
            })
        })
    }

    shangchuan = () => {
        this.refs.chjuang.click()
    }
    dsfd = () => {
        let file = this.refs.chjuang.files[0];
        let data = new FormData();
        data.append('avatar', file);
        axios({
            url: '/vue/upload',
            method: 'POST',
            contentType: false,
            processData: false,
            data: data
        }).then(res => {
            console.log(res)
            console.log(res.data.avatarurl)
            var fat = res.data.avatarurl.replace(/public/, '');
            var a = "http://47.102.135.185:2019"+fat
            this.setState({
                img:a
            })
            console.log(a)
            // sessionStorage.img=fat
        })
     
    }
    xiugai=()=>{
        console.log(1211)
        this.setState({
            flg:false
        })
    }
    aqueren=()=>{
        var phone = this.refs.phone.value
        var password = this.refs.password.value  
        var reg = /^1(3|5|6|7|8|9)[0-9]{9}$/
        var passwordEgt = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._@$]){5,11}$/
        if(!reg.test(phone)){return alert("手机号码格式错误")}     
        if(!passwordEgt.test(password)){return  alert("密码格式错误")}     
        var a = {...this.state.arr,phone,password,passwords:password}
        axios.post("/vue/userxiugai",{data:a}).then(res=>{
            console.log(res)
        })

        this.setState({
            arr:a,
            flg:true
        })
    }
    render() {
        const {
            arr,
            flg
        } = this.state

        return (
            <div className='box-warp-ton'>
                <h2 style={{ fontSize: 24 }}>个人资料修改</h2>
                <div>
                    <img src={this.state.img} alt="上传头像" className="tou" />
                    <button className="but-a-anniu" onClick={this.shangchuan} style={{ marginLeft: 18 }}>上传头像</button>   <button style={{background:"red",border:"red"}}  className="but-a-anniu" onClick={this.xiugai}>
                    更改个人资料
                    
                </button>
                    <input className="akjlk" type="file" ref="chjuang" name="" id="" accept="image/*" onChange={this.dsfd} />
                </div>

                <div className="xiq-yonghu"  style={{display:flg?"block":"none"}}>
                    <li className="clear">
                        <span>手机号码：</span>
                        <span>{arr.phone}</span>
                    </li>
                    <li className="clear">
                        <span>密码：</span>
                        <span>{arr.password}</span>
                    </li>

                </div>
                <div className="xiq-yonghu" style={{display:flg?"none":"block"}}>
                    <li className="clear">
                        <span>手机号码：</span>
                        <input ref="phone" type="text" />
                    </li>
                    <li className="clear">
                        <span>密码：</span>
                        <input ref="password" type="text" />
                    </li>
                    <button className="but-a-anniu" onClick={this.aqueren}>确认</button>
                    <button className="but-a-anniu" onClick={this.axiugai}>取消</button>
                </div>
           
            </div >
        );
    }
}

export default Tempe;