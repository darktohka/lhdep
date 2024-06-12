import React from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Delivery from "../Components/Delivery/Delivery";
import NewCollections from "../Components/NewCollections/NewCollections";
import Email from "../Components/Email/Email";

const Home = () => {
    return (
        <div>
            <Hero/>
            <Popular/>
            <Delivery/>
            <NewCollections/>
            <Email/>
        </div>
    )
}

export default Home