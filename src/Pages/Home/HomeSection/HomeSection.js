import React from "react";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import brand1 from "../../../Assets/1.webp";
import brand2 from "../../../Assets/2.webp";
import brand3 from "../../../Assets/3.webp";
import brand4 from "../../../Assets/4.webp";
import brand5 from "../../../Assets/5.webp";
import brand6 from "../../../Assets/6.webp";
import { Link } from "react-router-dom";

const HomeSection = () => {
    return (
        <div className="my-20">
            <SectionHeader>Popular Brand working with Us</SectionHeader>
            <div className="carousel carousel-center p-4 space-x-4 bg-yellow-300 rounded-box mt-10">
                <div className="carousel-item">
                    <a target="_blank" href="https://www.tatamotors.com/">
                        <img src={brand1} className="rounded-box" />
                    </a>
                </div>
                <div className="carousel-item">
                    <a target="_blank" href="https://www.ashokleyland.com/">
                        <img src={brand2} className="rounded-box" />
                    </a>
                </div>
                <div className="carousel-item">
                    <a target="_blank" href="http://www.eicher.in/">
                        <img src={brand3} className="rounded-box" />
                    </a>
                </div>
                <div className="carousel-item">
                    <a target="_blank" href="https://www.smlisuzu.com/">
                        <img src={brand4} className="rounded-box" />
                    </a>
                </div>
                <div className="carousel-item">
                    <a target="_blank" href="https://www.mahindratruckandbus.com/">
                        <img src={brand5} className="rounded-box" />
                    </a>
                </div>
                <div className="carousel-item">
                    <a target="_blank" href="https://www.smlisuzu.com/">
                        <img src={brand6} className="rounded-box" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HomeSection;
