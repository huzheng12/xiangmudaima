import React, { Component } from 'react';
import './index.scss'
import axios from 'axios'
import { connect } from 'react-redux'
@connect(
    state => {
        return {
            time: state.data.time
        }
    }
)
class Resume extends Component {
    state = {
        arr: [],
        num: 1,
        changdu: 0,
        flg: true,
        flgsq: true
    }
    componentDidMount() {
        axios.get('/vue/xingqixsuoyou', { params: { getaa: this.state.num } }).then(res => {
            console.log(res)
            this.setState({
                changdu: res.data.args,
                arr: res.data.result.reverse()
            })
            var a = (Math.floor(this.state.changdu / 30) + 1) * 1
            if (this.state.num >= a) {
                if (this.state.num == 1) {
                    this.setState({
                        flgsq: false
                    })
                } else {
                    this.setState({
                        flg: false,
                        flgsq: true
                    })
                }
            }
        })
    }
    testSubmit = () => {

    }
    biaofafa = () => {

        var obj = {}
        var times = this.props.time
        obj.time = `${times.year}/${times.month}/${times.riqi} ${times.hour}:${times.min}`
        obj.content = this.refs.one.value || ""
        console.log(obj.content)
        if (obj.content === "") {
            alert("请输入内容")
        } else {
            axios.get('/vue/xingqix', { params: obj }).then(res => {
                console.log(res)
            })
            this.state.arr.unshift(obj)
            if (this.state.arr.length >= 30) {
                axios.get('/vue/xingqixsuoyou', { params: { getaa: this.state.num } }).then(res => {
                    this.setState({
                        arr: res.data.result.reverse()
                    })
                })
                if (!this.state.flgsq) {
                    this.setState({
                        flgsq: true
                    })
                }
            } else {
                this.setState({
                    arr: this.state.arr
                })
            }
        }
    }
    jiazaigengduo = () => {
        var a = (Math.floor(this.state.changdu / 30) + 1) * 1
        this.setState({
            num: ++this.state.num
        })
        axios.get('/vue/xingqixsuoyou', { params: { getaa: this.state.num } }).then(res => {
            console.log(res)
            this.setState({
                changdu: res.data.args,
                arr: res.data.result.reverse()
            })
        })
        if (this.state.num >= a) {
            this.setState({
                flg: false
            })
        }
    }
    render() {
        const {
            time
        } = this.props
        const {
            arr,
            flg,
            flgsq
        } = this.state
        console.log(time)
        return (
            <div className='box-warp-ton'>
                <h2>我是心情 == 我是心情</h2>
                <div style={{ textAlign: "center", height: 200 }}>
                    <div>{time.year} 年 {time.month} 月 {time.riqi} 日      星期：{time.xingqi}</div>
                    <textarea ref="one" name="" id="" className="xinq-bianxie"></textarea>
                    <button onClick={this.biaofafa} style={{ display: sessionStorage.username === "hz1282" ? "block" : "none", marginLeft: 101 }} className="but-a-anniu">发表</button>
                </div>
                <div id="acee">
                    {
                        arr.map((item, i) => {
                            return (
                                <li key={i} className="clear">
                                

                                        <span style={{
                                            display: "inline-block",
                                            width: "700px",

                                            textIndent: 32
                                        }}>{item.content}</span>
                                        <p>{item.time}</p>

                                 
                                </li>
                            )
                        })
                    }
                </div>
                <div style={{ display: flgsq ? "block" : "none", textAlign: "center " }} >
                    <button ref="xiaoshiq" style={{ display: flg ? "inline-block" : "none" }} className="but-a-anniu but" onClick={this.jiazaigengduo}>加载更多</button>
                    <span ref="xiaoshi" style={{ display: flg ? "none" : "inline-block", fontSize: 23 }}>亲！已经到底了</span>
                </div>
            </div>
        );
    }
}

export default Resume;