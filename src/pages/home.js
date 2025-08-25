import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  HeaderContainer,
  FeaturedListingContainer,
  // FeaturedAgentsContainer,
  HomeContactContainer,
  FooterContainer,
} from "../containers";
// import Loading from "../components/loading";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    window.onpageshow = function (event) {
      if (event.persisted) {
        window.location.reload();
      }
    };
  }, [dispatch]);

  // if (listProperties.length === 0) {
  //   return <Loading />
  // }

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