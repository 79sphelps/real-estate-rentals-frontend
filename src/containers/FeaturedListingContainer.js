import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Section } from "../components";
import { ListingItemContainer } from "./index";
import { getRentals } from "../redux/actions";
import { selectRentals, selectIsLoading } from "../redux/selectors";
import loading from "../assets/loading.svg";

const FeaturedListingContainer = () => {
  const dispatch = useDispatch();
  const listProperties = useSelector(selectRentals);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    window.onpageshow = function (event) {
      if (event.persisted) {
        window.location.reload();
      }
    };

    if (!isLoading) {
      dispatch(getRentals());
    }
  }, [dispatch]);

  // if (listProperties.length === 0) {
  //   return <Loading />
  // }

  const tempPropertyList = [
    {
      _id: 1,
      address: "Loading address...",
      price: "Acquiring price...",
      description: "Acquiring property description...",
      images: [loading],
    },
    {
      _id: 2,
      address: "Loading address...",
      price: "Acquiring price...",
      description: "Acquiring property description...",
      images: [loading],
    },
    {
      _id: 3,
      address: "Loading address...",
      price: "Acquiring price...",
      description: "Acquiring property description...",
      images: [loading],
    },
  ];

  return (
    <Section bgColor="--bs-light">
      <Section.InnerContainer>
        <Section.Header>
          <Section.Title>My Featured Listings</Section.Title>
        </Section.Header>
        <Section.Content>
          {listProperties &&
          Array.isArray(listProperties) &&
          listProperties.length !== 0
            ? listProperties.map((featured, idx) => (
                <ListingItemContainer key={idx} featured={featured} />
              ))
            : tempPropertyList.map((featured, idx) => (
                <ListingItemContainer key={idx} featured={featured} />
              ))}
        </Section.Content>
        <Section.Footer>
          <Section.Button>More Listings</Section.Button>
        </Section.Footer>
      </Section.InnerContainer>
    </Section>
  );
};

export default FeaturedListingContainer;
