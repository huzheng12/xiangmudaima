import React, { Component } from 'react';
import axios from 'axios'
import './index.scss'
import store from '../../store'
import { history } from '../../../utils/history'
import { bianjiliuyan, lililiflg, huoqu } from '../../action';
class Xiangq extends Component {
    state = {
        arr: {}
    }
    componentWillMount() {
        let liswee = window.location.hash.split("?")[1].split("=")[1]
        console.log(liswee)
        axios.get("/vue/webcontetxiq", { params: { id: liswee } }).then(res => {
            console.log(res)
            this.setState({
                arr: res.data.result[0]
            })
        })
    }
    tiaozhuan = (a) => {
        console.log(a._id)
        var id = a._id
        store.dispatch(bianjiliuyan(id))
        store.dispatch(lililiflg(false))
        store.dispatch(huoqu(true))
        history.push("/home/journal")
    }
    fanhuigo = () => {
        history.go(-1)
    }
    render() {
        const {
            arr
        } = this.state
        return (
            <div className='box-warp-ton'>
                <div style={{ width: "100%", height: 100 }}>
                    <div style={{ width: "100%", height: 50, backgroundColor: "#000", color: "#fff", lineHeight: "50px", fontSize: 32, textAlign: "center" }}>
                        <h1>{arr.title}</h1>
                    </div>
                    <div className="dianzan-xianqi" style={{ width: "100%" }}>
                        <button onClick={this.fanhuigo}>返回</button>|
                        <button>点赞</button>|
                        <button>转发</button>|
                       <button>分享</button>|
                        <button>复制地址</button>|
                        <button onClick={() => this.tiaozhuan(arr)}>编辑</button>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: arr.consten }} style={{ padding: 20 }}>

                </div>
                <div className="xianq-footer clear">
                    <div style={{ float: "right", width: 300 }}>
                        <span style={{ marginRight: 15 }}>时间：{arr.time}</span>
                        <span style={{ marginRight: 15 }}>作者：{arr.name}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Xiangq;