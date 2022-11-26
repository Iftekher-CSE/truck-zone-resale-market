import React from "react";
import AdvertisedItem from "./AdvertisedItem/AdvertisedItem";
import Banner from "./Banner/Banner";
import Categories from "./Categories/Categories";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AdvertisedItem></AdvertisedItem>
            <Categories></Categories>
        </div>
    );
};

export default Home;
