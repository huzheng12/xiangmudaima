import React, { Component } from 'react';
import './index.scss'

class Head extends Component {
    constructor() {
        super();
        this.state = {
            img: {
                logo: require('../../img/logo.png'),
                pic: require('../../img/pic.png')
            }
        }
    }
    render() {
        const {
            img: {
                logo,
                pic
            }
        } = this.state
        return (
            <div className="Head-com-warp">
                <div className="clear" style={{ width: 1050, margin: "0 auto" }}>
                    <img src={logo} alt="" style={{
                        width: 268,
                        marginTop: 66,
                        float: "left"
                    }} />
                    <img src={pic} alt="" style={{
                        width: 268,
                        marginTop: 38,
                        float: "left",
                        marginLeft: 514
                    }} />

                </div>
            </div>
        );
    }
}

export default Head;