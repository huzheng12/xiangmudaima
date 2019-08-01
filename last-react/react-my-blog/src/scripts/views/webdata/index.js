import React, { Component } from 'react';
import axios from "axios"
class Webdata extends Component {
    state = {
        mobile: 0,
        code: 0,
        content: ""
    }
    fasong = () => {
        var mobile = this.refs.one.value
        console.log(mobile)
        axios.post("/vue/sendCode", { mobile }).then(res => {
            console.log(res)
            this.setState({
                mobile,
                code: res.data.result
            })
        })
    }
    fasongs = () => {
        var mobile = this.state.mobile
        var code = this.state.code
        axios.post("/vue/checkCode", { mobile, code }).then(res => {
            console.log(res)
            this.setState({
                content: res.data.msg

            })
        })
    }
    render() {
        return (
            <div className='box-warp-ton'>
                <h2>前端数据</h2>
                <input ref="one" type="text" />
                <button onClick={this.fasong}>FASONG</button>
                <button onClick={this.fasongs}>验证</button>
                <p>{this.state.code}</p>
                <p>{this.state.content}</p>
            </div>
        );
    }
}

export default Webdata;