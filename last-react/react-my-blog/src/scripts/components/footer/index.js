import React, { Component } from 'react';
import store from '../../store'
import './index.scss'
import { connect } from "react-redux"
@connect(
    state => {
        return {
            time: state.data.time
        }
    }
)
class Foot extends Component {
    render() {
        const {
            time
        } = this.props
        return (
            <div className="foot-warp">
                <p>Design By  {time.year} 年 {time.month} 月 {time.riqi} 日</p>
            </div>
        );
    }
}

export default Foot;