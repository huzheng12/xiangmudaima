import React, { Component } from 'react';
import demo from "../../mobx/demo"
import { observer } from 'mobx-react'
@observer
//监听修改使用
class Photos extends Component {
    arr = () => {
        var cont = this.refs.one.value
        demo.wohenzai(cont)
    }
    render() {
        const {
            wer
        } = demo
        return (
            <div className='box-warp-ton clear'>
                <h2>使用mpbx架构实现传值已经改值</h2>
                <p>
                    {wer}
                </p>
                <input ref="one" type="text" />
                <button onClick={this.arr}>修改</button>
            </div>
        );
    }
}

export default Photos;