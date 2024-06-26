import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Section } from "../components";
import { ListingItemContainer } from "./index";
import { getRentals } from "../redux/actions";
import { selectRentals } from "../redux/selectors";

const FeaturedListingContainer = () => {
  const dispatch = useDispatch();
  const listProperties = useSelector(selectRentals);

  useEffect(() => {
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
            <Section.Title>My Featured Listings</Section.Title>
          </Section.Header>
          <Section.Content>
            {listProperties.map((featured, idx) => (
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
