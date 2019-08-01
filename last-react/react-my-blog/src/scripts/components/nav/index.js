import React, { Component } from 'react';
import { Link } from "react-router-dom"
import './index.scss'
import { history } from '../../../utils/history'
class HeadNav extends Component {
    state = {
        arr: [
            { title: "主页", link: "/", active: "nav-active", },
            { title: "日志(富文本)", link: "/home/journal", active: "", },
            { title: "mobx", link: "/home/photos", active: "", },
            { title: "留言板(分页)", link: "/home/guestbook", active: "", },
            { title: "说说(加载)", link: "/home/resume", active: "", },
            { title: "手机验证码", link: "/home/webdata", active: "", },
            { title: "上传头像", link: "/home/tempe", active: "", }
        ],

    }
    componentWillMount() {
        let liswee = window.location.hash.replace(/#\/home\//, "")
        var glf = true
        console.log(liswee)
        this.state.arr.map((item, i) => {
            let actives = item.link.replace(/\/home\//, "")
            item.active = ""
            console.log(actives, liswee)
            if (liswee == actives) {
                item.active = "nav-active"
                return glf = false
            }
        })
        console.log(liswee.split("?")[0])
        if (liswee.split("?")[0] == "xiangq") {
            this.state.arr[1].active = "nav-active"
            return glf = false
        }
        if (glf) {
            this.state.arr[0].active = "nav-active"
        }
    }
    componentWillUpdate() {
        let liswee = window.location.hash.replace(/#\/home\//, "")
        var glf = true
        this.state.arr.map((item, i) => {
            let actives = item.link.replace(/\/home\//, "")
            item.active = ""
            console.log(actives, liswee)
            if (liswee == actives) {
                item.active = "nav-active"
                return glf = false
            }
        })
        if (liswee.split("?")[0] == "xiangq") {
            this.state.arr[1].active = "nav-active"
            return glf = false
        }
        if (glf) {
            this.state.arr[0].active = "nav-active"
        }
    }
    render() {
        const {
            arr
        } = this.state
        return (
            <div className="nav-wap">
                <ul className="clear" style={{
                    width: 1050,
                    margin: "0 auto",
                    fontSize: 16
                }}>
                    {
                        arr.map((item, i) => {
                            return (
                                <li key={i}>
                                    <Link to={item.link} className="Nav-link-text" id={item.active} >{item.title}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div >
        );
    }
}

export default HeadNav;