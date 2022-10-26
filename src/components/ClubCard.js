import React from "react";
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Pagination, Navigation} from "swiper/core";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../css/ClubCard.css";
SwiperCore.use([Pagination, Navigation]);

function ClubCard({item}) {
    return (
        <div className="club-card">
            <Swiper className="club-card-swiper"
                style={{
                    width: "100%",
                    height: "500px",
                }}
                spaceBetween={30}
                slidesPerView={3}
                pagination={{
                    clickable: true,
                }}
                navigation={{
                    clickable: true,
                }}>
                {item.map((Val) => {
                    return (
                        <SwiperSlide className="club-card-slide">
                            <Link to={`/boards/${Val.id}/list`} className="club-card-link">
                                <div className="club-card-content">
                                    <div className="club-card-title">
                                        {Val.title}
                                    </div>
                                    <div className="club-card-img">
                                        {Val.img}
                                    </div>
                                    <div className="club-card-desc">
                                        {Val.desc}
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default ClubCard;