import React, { Component } from 'react';
import './index.scss';
import axios from 'axios';
import Swipers from '../../components/swiper';
import { HashRouter as Hash, Route, Switch, Link } from "react-router-dom"
class Shouiye extends Component {
    state = {
        arr: [
            {
                img: require('../../img/time.jpg')
            },
            {
                img: require('../../img/0_3.jpg')
            },
            {
                img: require('../../img/art2.jpg')
            },
            {
                img: require('../../img/1_3.jpg')
            },
            {
                img: require('../../img/2_3.jpg')
            },
        ],
        webarr: []

    }
    componentDidMount() {
        axios.get("/vue/webcontet").then(res => {
            console.log(res)
            this.setState({
                webarr: res.data.result
            })

        })
    }
    render() {
        const {
            arr,
            webarr
        } = this.state
        console.log(webarr)
        return (
            <div className="conten-home clear">
                <div style={{
                    padding: 10, width: 1050,
                    display: "inline-block"
                }}>
                    <Swipers />
                    <div style={{ float: "right" }}>
                        <h2 className="swiper-right-li">
                            <span className="iconfont icon-zan1 colorhu" style={{ fontSize: 16 }}></span>
                            <span>推荐文章</span>
                        </h2>
                        <div>
                            {/* 数据请求数据  8条数据 */}
                            <div style={{
                                height: 33,
                                lineHeight: "33px",
                                fontSize: "13px",
                                borderBottom: "1px solid #eee"
                            }}>
                                <span className="iconfont icon-xuhao-dian colorhu" style={{ fontSize: 9 }}></span>
                                <span className="xuhao-text-swper">sdlkfjlajl</span>
                            </div>
                            <div style={{
                                height: 33,
                                lineHeight: "33px",
                                fontSize: "13px",
                                borderBottom: "1px solid #eee"
                            }}>
                                <span className="iconfont icon-xuhao-dian colorhu" style={{ fontSize: 9 }}></span>
                                <span className="xuhao-text-swper">sdlkfjlajl</span>
                            </div>
                            <div style={{
                                height: 33,
                                lineHeight: "33px",
                                fontSize: "13px",
                                borderBottom: "1px solid #eee"
                            }}>
                                <span className="iconfont icon-xuhao-dian colorhu" style={{ fontSize: 9 }}></span>
                                <span className="xuhao-text-swper">sdlkfjlajl</span>
                            </div>
                            <div style={{
                                height: 33,
                                lineHeight: "33px",
                                fontSize: "13px",
                                borderBottom: "1px solid #eee"
                            }}>
                                <span className="iconfont icon-xuhao-dian colorhu" style={{ fontSize: 9 }}></span>
                                <span className="xuhao-text-swper">sdlkfjlajl</span>
                            </div>
                            <div style={{
                                height: 33,
                                lineHeight: "33px",
                                fontSize: "13px",
                                borderBottom: "1px solid #eee"
                            }}>
                                <span className="iconfont icon-xuhao-dian colorhu" style={{ fontSize: 9 }}></span>
                                <span className="xuhao-text-swper">sdlkfjlajl</span>
                            </div>
                            <div style={{
                                height: 33,
                                lineHeight: "33px",
                                fontSize: "13px",
                                borderBottom: "1px solid #eee"
                            }}>
                                <span className="iconfont icon-xuhao-dian colorhu" style={{ fontSize: 9 }}></span>
                                <span className="xuhao-text-swper">sdlkfjlajl</span>
                            </div>
                            <div style={{
                                height: 33,
                                lineHeight: "33px",
                                fontSize: "13px",
                                borderBottom: "1px solid #eee"
                            }}>
                                <span className="iconfont icon-xuhao-dian colorhu" style={{ fontSize: 9 }}></span>
                                <span className="xuhao-text-swper">sdlkfjlajl</span>
                            </div>
                            <div style={{
                                height: 33,
                                lineHeight: "33px",
                                fontSize: "13px",
                                borderBottom: "1px solid #eee"
                            }}>
                                <span className="iconfont icon-xuhao-dian colorhu" style={{ fontSize: 9 }}></span>
                                <span className="xuhao-text-swper">sdlkfjlajl</span>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="conten-home-inde clear">
                    <h2>旅游介绍</h2>
                    <ul>
                        {
                            arr.map((item, i) => {
                                return (

                                    <li key={i} style={{ float: "left", width: 208, padding: "20px 0" }}>
                                        <a href="" className="home-a-hezi">
                                            <img src={item.img} alt="" />
                                            <div className="ome-a-hezis">

                                            </div>
                                            <div className="home-a-hezis">
                                                <p style={{ textAlign: "center" }}>详细介绍</p>
                                            </div>

                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="conten-neirong-ho clear" style={{ paddingTop: "20px" }}>
                    <div className="neirong-left">
                        <h2>
                            <span className="icon-xuhao1 iconfont" style={{ color: "#996c39", fontSize: "16px", marginRight: "5px" }}>

                            </span>
                            <span style={{ fontWeight: 900 }}>最新笔记</span>
                        </h2>
                        {/* 循环渲染日志内容 */}
                        {
                            webarr.map((item, i) => {
                                return (
                                    <div className="conten-bomas" key={i}>
                                        <h3>{item.title}</h3>
                                        <p className="shouye-text-lib">发布时间：{item.time} 作者：{item.name} 分类：{item.cart}</p>
                                        <div className="content-web-gert">
                                            <dt style={{
                                                float: "left",
                                                marginRight: "15px"
                                            }} >
                                                <img src={item.img || "http://www.lmlblog.com/blog/11/images/4.jpg"} alt="" style={{
                                                    borderRadius: 3,
                                                    width: 200,
                                                    height: 138,
                                                }} />
                                            </dt>
                                            <dd style={{
                                                float: "left",
                                                width: 439
                                            }}>
                                                <div className="shouye-content" >
                                                    <p dangerouslySetInnerHTML={{ __html: item.consten }}></p>
                                                </div>
                                                <Link to={"/home/xiangq?id=" + item._id} className="but-web">查看详情</Link>
                                            </dd>
                                        </div>

                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="nerrong-right">
                        <div style={{ float: "right" }}>
                            <h2 className="swiper-right-li">
                                <span className="iconfont icon-zan1 colorhu" style={{ fontSize: 16 }}></span>
                                <span>推荐文章</span>
                            </h2>
                            <div>
                                {/* 数据请求数据  8条数据 */}
                                <div style={{
                                    height: 33,
                                    lineHeight: "33px",
                                    fontSize: "13px",
                                    borderBottom: "1px solid #eee"
                                }}>
                                    <span className="iconfont icon-xuhao-dian colorhu" style={{ fontSize: 9 }}></span>
                                    <span className="xuhao-text-swper">sdlkfjlajl</span>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Shouiye;