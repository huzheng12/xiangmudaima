import React, { Component } from 'react';
import Swiper from 'swiper/dist/js/swiper';
import './index.scss'
class Swipers extends Component {
    state = {
        img: [
            require('../../img/1.jpg'),
            require('../../img/2.jpg'),
            require('../../img/3.jpg'),
            require('../../img/4.jpg')
        ]
    }
    render() {
        const {
            img
        } = this.state
        return (
            <div className="banner">
                <div id="one">
                    <div className="swiper-container" id="thumbs">
                        <div className="swiper-wrapper">
                            {
                                img.map((item, i) => {
                                    return (
                                        <div className="swiper-slide" key={i}>
                                            <img src={item} alt="" />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div id="toe">
                    <div className="swiper-container" id="gallery">
                        <div className="swiper-wrapper">
                            {
                                img.map((item, i) => {
                                    return (
                                        <div className="swiper-slide" key={i + 10}>
                                            <img style={{ width: 575 }} src={item} alt="" />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        var thumbsSwiper = new Swiper('#thumbs', {
            // autoplay: {
            //     delay: 3000,
            //     stopOnLastSlide: false,
            //     disableOnInteraction: true,
            // },
            // loop: true,
            spaceBetween: 10,
            slidesPerView: 4,
            watchSlidesVisibility: true,//防止不可点击
        })
        var gallerySwiper = new Swiper('#gallery', {
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
            },
            loop: true,
            spaceBetween: 10,
            thumbs: {
                swiper: thumbsSwiper,
            }
        })

    }
}
export default Swipers;