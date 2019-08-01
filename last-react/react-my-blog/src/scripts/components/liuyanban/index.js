import React, { Component } from 'react';
import './index.scss'
import axios from 'axios'
import store from '../../store'
import { numliuyan } from '../../action'
import { connect } from "react-redux"
@connect(
    state => {
        return {
            time: state.data.time
        }
    }

)
class Liuyanban extends Component {
    state = {
        arr: [],
        changdu: 0,
        xiugai: -1,
        conts: "",
        but: [],
        fenlyebut: 0,
        changduss: 0,
        abv: 0
    }
    componentDidMount() {
        setTimeout(() => {
            axios.get('/vue/bookshuoqu', { params: { getaa: 0 } }).then(res => {
                var num = Math.ceil(res.data.args / 10)
                store.dispatch(numliuyan(res.data.args))
                for (var i = 0; i < num; i++) {
                    this.state.but.push(i)
                    this.setState({
                        but: this.state.but,
                    })
                }
                console.log(this.state.but)
                this.setState({
                    arr: res.data.result.reverse(),
                    changdu: res.data.args,
                    zongye: num,
                    changduss: res.data.args
                })
            })
        }, 200)
    }
    faxiaobiao = () => {
        if (this.refs.two.value) {
            const time = new Date()
            var year = time.getFullYear();
            var month = (time.getMonth() + 1) < 10 ? "0" + (time.getMonth() + 1) : (time.getMonth() + 1);
            var riqi = (time.getDate()) < 10 ? "0" + time.getDate() : time.getDate();
            var xingqi = (time.getDay()) == 7 ? "日" : (time.getDay())
            var hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
            var min = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
            var second = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
            let objDate = {
                year, month, riqi, xingqi, hour, min, second
            }
            const obj = {
                "username": sessionStorage.username || "游客",
                "time": `${objDate.year}/${objDate.month}/${objDate.riqi} ${objDate.hour}:${objDate.min}`,
                "content": this.refs.two.value,
                "img": "http://huzhengmm.cn/hz/img/t1.jpeg"
            }
            if (sessionStorage.miaos) {
            } else {
                sessionStorage.miaos = 0
            }
            var timess = time.getTime()
            var munn = 30 - Math.floor((timess - sessionStorage.miaos) / 1000)
            if ((timess - sessionStorage.miaos) / 1000 >= 30) {
                if (sessionStorage.num) {
                    sessionStorage.num = sessionStorage.num * 1 + 1
                    if (sessionStorage.num <= 10) {
                        const aaa = this.state.arr.unshift(obj)
                        this.setState({
                            arr: this.state.arr,
                            changdu: this.state.changdu * 1 + 1,
                            changduss: this.state.changdu * 1 + 1
                        })
                        store.dispatch(numliuyan(this.state.changdu * 1 + 1))
                        sessionStorage.miaos = new Date().getTime()
                        axios.get('/vue/booksinse', { params: obj }).then(res => {
                            console.log(res)
                        })
                    } else {
                        alert("请不要刷屏，请关闭浏览器重新尝试")
                    }
                } else {
                    const aaa = this.state.arr.unshift(obj)
                    this.setState({
                        arr: this.state.arr,
                        changdu: this.state.changdu * 1 + 1,
                        changduss: this.state.changdu * 1 + 1
                    })

                    store.dispatch(numliuyan(this.state.changdu * 1 + 1))
                    sessionStorage.num = 1
                    sessionStorage.miaos = new Date().getTime()
                    axios.get('/vue/booksinse', { params: obj }).then(res => {
                        console.log(res)
                    })
                }
            } else {
                alert("请在" + munn + "s后发表")
            }
        }
    }
    xiugaia = (i, a) => {
        console.log(this.state.arr)
        if (sessionStorage.username) {
            this.setState({
                xiugai: i,
                conts: this.refs[i].innerHTML
            })
        } else {
            alert("请登录后修改")
        }
    }
    qureren = (index) => {
        this.setState({
            xiugai: -1,
            conts: ""
        })
        this.state.arr[index].content = this.state.conts
        axios.get("/vue/bookupdeda", { params: this.state.arr[index] }).then(res => {
            console.log(res)
        })
    }
    quexiao = () => {
        this.setState({
            xiugai: -1,
            conts: ""
        })
    }
    inputte = (index) => {
        this.setState({
            conts: this.refs["item" + index].value
        })

    }
    fenye = (a) => {
        axios.get("/vue/bookshuoqu", { params: { getaa: a } }).then(res => {
            if (a == 0) {
                this.setState({
                    changduss: this.state.changdu,
                    abv: a
                })
            } else {
                console.log(this.state.changdu)
                var ac = this.state.changdu - (this.state.changdu % 10) - (a - 1) * 10
                console.log(ac)
                this.setState({
                    changduss: ac,
                    abv: a
                })
            }
            this.setState({
                fenlyebut: a,
                arr: res.data.result.reverse()
            })
        })
    }
    shanchu = (a) => {
        console.log(a)
        // axios.get("/vue/booksindse", { params: a }).then(res => {
        //     console.log(res)
        //     this.state.arr.map((item, i) => {
        //         if (item === a) {
        //             this.setState({
        //                 arr: this.state.arr.splice(i, 1)
        //             })
        //         }
        //     })
        // })
    }
    render() {
        const {
            arr,
            changdu,
            xiugai,
            conts,
            but,
            fenlyebut,
            changduss,
            abv
        } = this.state
        console.log(arr)
        return (
            <div style={{ minHeight: 300 }}>
                <div className="liuyan-faxiao" style={{ display: abv == 0 ? "block" : "none" }}>
                    <textarea className="zhurenjiyu" rows="10" ref="two">

                    </textarea>
                    <button className="but-a-anniu"
                        onClick={this.faxiaobiao} style={{ borderColor: "#7B8C9E", backgroundColor: "#7B8C9E" }}>发表</button>
                </div>
                {

                    arr.map((item, i) => {
                        console.log(arr)
                        return (
                            <li className="li-liuyanmban clear" key={i}>
                                <div className="li-touxiang">
                                    <img src={item.img} alt="" />
                                </div>
                                <div className="book-liuyanneri clear" >
                                    <p className="liuyan-one">
                                        <span>{item.username}</span><span>ziti</span><span style={{ fontSize: 14, color: "#757575" }}>
                                            {changduss - i}楼</span>
                                    </p>
                                    <p className="liuyan-toe" style={{ display: xiugai == i ? "none" : "block" }} ref={i}>
                                        {item.content}
                                    </p>
                                    <div className="liuyan-toe3" style={{ display: xiugai == i ? "block" : "none" }} >
                                        <textarea style={{
                                            width: "80%", backgroundColor: "transparent",
                                            borderColor: "transparent",
                                            color: "#fff"
                                        }} value={conts}
                                            ref={"item" + i}
                                            onInput={() => this.inputte(i)}
                                        >

                                        </textarea>
                                        <div style={{ marginLeft: "23px" }}>

                                            <button className="but-liuyanban-quw" onClick={() => this.qureren(i)}>
                                                确认修改
                                            </button>
                                            <button className="but-liuyanban-quw" onClick={this.quexiao}>
                                                取消修改
                                            </button>
                                            <button className="but-liuyanban-quw" onClick={() => this.shanchu(item)}>
                                                删除
                                            </button>
                                        </div>
                                    </div>
                                    <div className="liuyan-stran">
                                        {item.time}
                                        <div>
                                            <button onClick={() => this.xiugaia(i, item.username)}
                                                style={{ display: sessionStorage.username == item.username || sessionStorage.username == "hz1282" ? "block" : "none" }}>
                                                修改
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
                <div className="foot-liuyanban">
                    <div style={{
                        width: "357px",
                        marginTop: "28px",
                        marginLeft: "324px"
                    }}>
                        {
                            but.map((item, i) => {
                                return (
                                    <button className="fenye-but" style={{ backgroundColor: fenlyebut === i ? "red" : "#fff" }} onClick={() => this.fenye(i)} key={i}>{item}</button>
                                )
                            })
                        } </div>
                </div>
            </div >
        );
    }
}

export default Liuyanban;