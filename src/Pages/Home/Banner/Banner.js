import React from "react";
import banner1 from "../../../Assets/banner- (1).png";
import banner2 from "../../../Assets/banner- (1).webp";
import banner3 from "../../../Assets/banner- (2).png";
import banner4 from "../../../Assets/banner- (3).png";

const Banner = () => {
    return (
        <div>
            <div className="carousel w-full h-96">
                <div id="item1" className="carousel-item w-full">
                    <img src={banner1} className="w-full" />
                </div>
                <div id="item2" className="carousel-item w-full">
                    <img src={banner2} className="w-full" />
                </div>
                <div id="item3" className="carousel-item w-full">
                    <img src={banner3} className="w-full" />
                </div>
                <div id="item4" className="carousel-item w-full">
                    <img src={banner4} className="w-full" />
                </div>
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
                <a href="#item1" className="btn btn-xs">
                    1
                </a>
                <a href="#item2" className="btn btn-xs">
                    2
                </a>
                <a href="#item3" className="btn btn-xs">
                    3
                </a>
                <a href="#item4" className="btn btn-xs">
                    4
                </a>
            </div>
        </div>
    );
};

export default Banner;
