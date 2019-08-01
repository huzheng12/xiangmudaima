import React, { Component } from 'react';
import './index.scss'
import { HashRouter as Hash, Route, Switch, Link } from "react-router-dom"
import axios from 'axios'
import { history } from '../../../utils/history'
import Ueditor from '../../components/ueditor'
import store from '../../store'
import { connect } from "react-redux"
import { lililiflg } from '../../action';
@connect(
    state => {
        return {
            wflg: state.data.wflg
        }
    }
)
class Journal extends Component {
    state = {
        flg: true,
        arr: []
    }
    componentWillMount() {
        setTimeout(() => {
            axios.get("/vue/webcontet").then(res => {
                this.setState({
                    arr: res.data.result.reverse()
                })
            })
        }, 200);
    }
    bianji = () => {
        store.dispatch(lililiflg(false))
        this.setState({
            flg: false
        })
    }
    bianjiwenz = (a) => {
        console.log(a)
        sessionStorage.content = a
        window.location.href = 'http://huzhengmm.cn/fuwen/'
    }
    shanchuyige = (i, a) => {
        this.state.arr.splice(i, 1)
        this.setState({
            arr: this.state.arr
        })
        axios.get("/vue/booksinssdfe", { params: a }).then(res => {
            console.log(res)
        })
    }
    render() {
        const {
            arr,

        } = this.state
        const {

            wflg
        } = this.props

        return (
            <div className='box-warp-ton clear'>
                <h2 style={{ paddingLeft: 10, fontWeight: 900, fontSize: 24 }}>个人日志</h2>
                <div className="box-left-jounal">
                    <div className="box-nav-jounal clear" >
                        <button className="but-a-anniu but" onClick={this.bianji} style={{ display: wflg ? "block" : 'none' }}>
                            写日志
                        </button>
                        <Ueditor id="content1" height="300" ref="content1" wflg={wflg} />
                        <div className="liebiao-book" ref="oneone" style={{ display: wflg ? "block" : 'none', overflowY: "auto" }} >
                            {
                                arr.map((item, i) => {
                                    return (
                                        <li key={i} className="clear">
                                            <Link to={"/home/xiangq?id=" + item._id} style={{ float: "left" }}>{item.title}</Link>
                                            <div style={{ float: "right", paddingRight: "15px" }}>
                                                <span>{item.time}</span>
                                                <button style={{
                                                    border: "transparent",
                                                    background: "#6ff"
                                                }} onClick={() => this.shanchuyige(i, item)}>删除</button>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Journal;