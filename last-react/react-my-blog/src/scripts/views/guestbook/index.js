import React, { Component } from 'react';
import './index.scss'
import store from '../../store'
import { namecontent } from '../../action'
import axios from 'axios'
import Liuyanban from '../../components/liuyanban';
import { connect } from "react-redux"
@connect(
    state => {
        return {
            content: state.data.jiyu,
            num: state.data.num
        }
    },
    dispatch=>{
        return {
            countadd:(n)=>dispatch(countAdd(n))
        }
    }
)
class guestbook extends Component {
    state = {
        flg: true,
    }
    componentWillMount() {
        axios.get("/vue/userjiyuhuoqu").then(res => {
            console.log(res)
            store.dispatch(namecontent(res.data.result[0].jiyu))
        })
    }
    huoqushuju = () => {
        store.dispatch(namecontent(this.refs.one.value))
        axios.get("/vue/userjiyu", {
            params: {
                jiyu: this.refs.one.value
            }
        }).then(res => {
            console.log(res.data.type)
            if (!!res.data.type) {
                this.refs.one.value = ""
                this.setState({
                    flg: true
                })
            }
        })
    }
    quxiao = () => {
        this.refs.one.value = ""
        this.setState({
            flg: true
        })
    }
    xianshi = () => {
        this.setState({
            flg: false
        })
    }
    render() {
        const {
            content,
            num
        } = this.props
        const {
            flg
        } = this.state

        return (
            <div className='box-warp-ton' style={{ padding: "15px" }}>
                <h2 style={{ fontSize: "26px", fontWeight: 900, fontFamily: "Georgia" }}>
                    留言板
                </h2>
                <h3 style={{ lineHeight: "30px", borderBottom: "1px solid rgb(195, 186, 186)", padding: "10px 0" }}>
                    <span style={{ marginRight: "10px" }}>主人寄语</span>
                    <a href="javascript:;" onClick={this.xianshi} className="but-a-anniu" style={{ display: sessionStorage.username === 'hz1282' ? "inline-block" : "none" }}>更新寄语 </a>
                </h3>
                <div style={{ display: flg ? "block" : "none", height: 200, fontSize: 24, color: "red", textAlign: "center", paddingTop: 10 }}>
                    {content}
                </div>
                <div style={{ marginTop: 10, minHeight: 200, display: flg ? "none" : "block" }} >


                    <textarea name="" id="" className="zhurenjiyu" ref="one">

                    </textarea>
                    <button className="but-a-anniu" onClick={this.huoqushuju}>发表</button>
                    <button className="but-a-anniu" onClick={this.quxiao}>取消</button>
                </div>
                <div className="box-content-book">
                    <div className="tou-book" >
                        <span>留言（{num}）</span>
                    </div>
                    <Liuyanban />
                </div>
            </div>
        );
    }
}

export default guestbook;