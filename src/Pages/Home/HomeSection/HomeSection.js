import React from "react";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import brand1 from "../../../Assets/1.webp";
import brand2 from "../../../Assets/2.webp";
import brand3 from "../../../Assets/3.webp";
import brand4 from "../../../Assets/4.webp";
import brand5 from "../../../Assets/5.webp";
import brand6 from "../../../Assets/6.webp";

const HomeSection = () => {
    return (
        <div className="my-20">
            <SectionHeader>Popular Brand working with Us</SectionHeader>
            <div className="carousel carousel-center p-4 space-x-4 bg-yellow-300 rounded-box mt-10">
                <div className="carousel-item">
                    <img src={brand1} className="rounded-box" />
                </div>
                <div className="carousel-item">
                    <img src={brand2} className="rounded-box" />
                </div>
                <div className="carousel-item">
                    <img src={brand3} className="rounded-box" />
                </div>
                <div className="carousel-item">
                    <img src={brand4} className="rounded-box" />
                </div>
                <div className="carousel-item">
                    <img src={brand5} className="rounded-box" />
                </div>
                <div className="carousel-item">
                    <img src={brand6} className="rounded-box" />
                </div>
            </div>
        </div>
    );
};

export default HomeSection;
