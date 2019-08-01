import React, { Component } from 'react';
import Head from '../components/header';
import HeadNav from '../components/nav';
import Foot from '../components/footer';
import { innser, usernmae } from '../action';
import store from '../store'
import { HashRouter as Hash, Route, Switch, Link } from "react-router-dom"
import Shouiye from './shouye';
import Journal from './journal';
import Webdata from './webdata';
import Tempe from './tempe';
import Resume from './resume';
import Photos from './photos';
import guestbook from './guestbook';
import { history } from '../../utils/history'
import { connect } from "react-redux"
import Xiangq from './xiangqing/idnex';
@connect(
    state => {
        return {
            flg: state.data.flg
        }
    }
)

class Home extends Component {
    state = {
        usename: ""
    }
    componentWillMount() {
        const time = new Date()
        var year = time.getFullYear();
        var month = (time.getMonth() + 1) < 10 ? "0" + (time.getMonth() + 1) : (time.getMonth() + 1);
        var riqi = (time.getDate()) < 10 ? "0" + time.getDate() : time.getDate();
        var xingqi = (time.getDay()) == 7 ? "日" : (time.getDay())
        var hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
        var min = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
        var second = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
        console.log(month)
        let objDate = {
            year, month, riqi, xingqi, hour, min, second
        }
        store.dispatch(innser(objDate))




        if (sessionStorage.username) {
            console.log(4444)
            this.setState({
                usename: sessionStorage.username
            })
            store.dispatch(usernmae(false))

        } else {
            store.dispatch(usernmae(true))

        }

    }
    aaa = () => {
        sessionStorage.username = ""
    }
    longin = () => {
        history.push("/login")
    }
    register=()=>{
        history.push("/register")
    }
    render() {
        const {
            usename
        } = this.state
        const {
            flg
        } = this.props
        console.log(flg)
        return (
            <div className="Home-warp">
                <Head />
                <HeadNav />
                <div className="denglu-login">
                    <div style={{ display: flg ? "block" : "none" }}>
                        <button className="but-a-anniu" onClick={this.longin}>登录</button>
                        <button className="but-a-anniu" onClick={this.register}>注册</button>
                    </div>
                    <div style={{ display: flg ? "none" : "block" }}>
                        欢迎{usename}登录
                        <Link onClick={this.aaa} to="/login" style={{
                            color: "#305E67",
                            backgroundColor: "transparent",
                            borderColor: "transparent",
                            border: "none",
                            position: "absolute",
                            bottom: "-30px",
                            left: "80px",
                            width: "50px"
                        }}>注销</Link>
                    </div>
                </div>
                <Switch>
                    <Route exact path="/" component={Shouiye}></Route>
                    <Route path="/home/journal" component={Journal}></Route>
                    <Route path="/home/webdata" component={Webdata}></Route>
                    <Route path="/home/tempe" component={Tempe}></Route>
                    <Route path="/home/resume" component={Resume}></Route>
                    <Route path="/home/photos" component={Photos}></Route>
                    <Route path="/home/guestbook" component={guestbook}></Route>
                    <Route path="/home/xiangq" component={Xiangq}></Route>
                </Switch>
                <Foot />
            </div >
        );
    }
}

export default Home;