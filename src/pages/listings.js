import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HeaderContainer,
  ListingItemContainer,
  // AdvancedSearchContainer,
  FooterContainer,
} from "../containers";
import { Section } from "../components";
// import { getPropertyList } from "../redux/actions/propertiesAction";
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

const Listing = () => {
  const dispatch = useDispatch();
  // const listProperties = useSelector((state) => state.propertyList);
  // const listProperties = useSelector(state => state.rentals)
  const listProperties = useSelector(selectRentals);
  // const { properties } = listProperties;
  const properties = listProperties;

  useEffect(() => {
    window.onpageshow = function (event) {
      if (event.persisted) {
        window.location.reload();
      }
    };
    dispatch(getRentals());
  }, [dispatch]);

  console.log('--- properties ---');
  console.log(properties)

  return (
    <>
      <HeaderContainer bg="false" />
      {properties && Array.isArray(properties) ? (
        <Section bgColor="--bs-fade-info">
          <Section.InnerContainer>
            <Section.Flex>
              {/* <Section.FlexItem width="30%" relative flexStart>
                <Section.Shadow>
                  <AdvancedSearchContainer />
                </Section.Shadow>
              </Section.FlexItem> */}

              {/* <Section.FlexItem width="65%"> */}
              <Section.FlexItem width="99%"> 
                <Section.Title>Our Property List</Section.Title>
                <Section.Content>
                  {properties &&
                    properties.map((featured) => (
                      <ListingItemContainer
                        key={featured._id}
                        featured={featured}
                        // width="49%"
                        width="33%"
                      />
                    ))}
                </Section.Content>
                {/* <Section.Footer>
                  <Section.Button>More Listing</Section.Button>
                </Section.Footer> */}
              </Section.FlexItem>
            </Section.Flex>
          </Section.InnerContainer>
        </Section>
      ) : null}
      <FooterContainer />
    </>
  );
};

export default Listing;
