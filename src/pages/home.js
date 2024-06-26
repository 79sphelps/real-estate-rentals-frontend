import React, { useEffect } from "react";
import {
  HeaderContainer,
  FeaturedListingContainer,
  // FeaturedAgentsContainer,
  HomeContactContainer,
  FooterContainer,
} from "../containers";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeaderContainer bg="true" source="/images/banners/banner4.jpg" />
      <FeaturedListingContainer />
      <HomeContactContainer />
      <FooterContainer />
    </>
  );
};

export default Home;
