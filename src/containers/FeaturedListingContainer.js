import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Section } from "../components";
import { ListingItemContainer } from "./index";
// import { getFeaturedList } from "../redux/actions/propertiesAction";

import {
  getRentals,
  // deleteRentals,
  // findByTitle,
  // setSearchTitle,
  // setCurrentIndex,
  // setCurrentRental,
} from "../redux/actions";
import {
  selectRentals,
  // selectCurrentRental,
  // selectCurrentIndex,
  // selectSearchTitle,
} from "../redux/selectors";

const FeaturedListingContainer = () => {
  const dispatch = useDispatch();

  // const featuredList = useSelector((state) => state.featuredProperty);

  // const { featured: featuredProperties } = featuredList;

  const listProperties = useSelector(selectRentals);

  // useEffect(() => {
  //   dispatch(getFeaturedList());
  // }, [dispatch]);

  useEffect(() => {
    // dispatch(getPropertyList());

    window.onpageshow = function (event) {
      if (event.persisted) {
        window.location.reload();
      }
    };
    dispatch(getRentals());
  }, [dispatch]);

  return (
    <Section bgColor="--bs-light">
      {listProperties && Array.isArray(listProperties) ? (
        <Section.InnerContainer>
          <Section.Header>
            <Section.Title>Our Featured Listings</Section.Title>
          </Section.Header>
          <Section.Content>
            {/* {featuredProperties.map((featured) => ( */}
            {listProperties.map((featured, idx) => (
              // <ListingItemContainer key={featured.id} featured={featured} />
              <ListingItemContainer key={idx} featured={featured} />
            ))}
          </Section.Content>
          <Section.Footer>
            <Section.Button>More Listings</Section.Button>
          </Section.Footer>
        </Section.InnerContainer>
      ) : null}
    </Section>
  );
};

export default FeaturedListingContainer;
