import { useQuery } from "@tanstack/react-query";
import React from "react";
import AdvertisedItem from "./AdvertisedItem/AdvertisedItem";
import Banner from "./Banner/Banner";
import Categories from "./Categories/Categories";
import HomeSection from "./HomeSection/HomeSection";

const Home = () => {
    // get all !sold advertised product
    const { data: advProducts = [], refetch } = useQuery({
        queryKey: ["allTruck-advertised"],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/allTruck-advertised`);
            const data = await res.json();
            console.log(data);
            return data;
        },
    });
    return (
        <div>
            <Banner></Banner>
            {advProducts.length > 0 && <AdvertisedItem advProducts={advProducts} refetch={refetch}></AdvertisedItem>}
            <Categories></Categories>
            <HomeSection></HomeSection>
        </div>
    );
};

export default Home;
