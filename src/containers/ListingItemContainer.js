import React from "react";
import { Listing } from "../components";

const ListingItemContainer = ({ featured, width }) => {
  return (
    <Listing width={width}>
      <Listing.Top>
        <Listing.TopItem>
          <Listing.Image source={featured.images[0]} />
          <Listing.TopItemContainer>
            <Listing.TopItemInfo>
              <Listing.Icon></Listing.Icon>
              {/* <Listing.Text location>{featured.location}</Listing.Text>
               */}
               <Listing.Text location>{featured.address}</Listing.Text>
            </Listing.TopItemInfo>
          </Listing.TopItemContainer>
        </Listing.TopItem>
      </Listing.Top>
      <Listing.Bottom>
        <Listing.BottomItem>
          <Listing.Title>
            <Listing.Anchor to={`/rentals/${featured._id}`} >
              {/* {featured.title} */}
              { featured.address }
            </Listing.Anchor>
          </Listing.Title>
          <Listing.Price>Rent {featured.rent}/mon</Listing.Price>
          <Listing.Text description>
            {/* {featured.description.substring(0, 100)} */}
            { featured.description_1.substring(0, 100) }

          </Listing.Text>
          <Listing.Button>
            {/* <Listing.Anchor to={`/property/${featured._id}`}> */}
            <Listing.Anchor to={`/rentals/${featured._id}`}>
              Details
            </Listing.Anchor>
          </Listing.Button>
          {/* <Listing.AgentContainer>
            <Listing.AgentImageContainer>
              <Listing.Image
                src={`/images/agents/${featured.agent.image}`}
                profile="true"
              />
            </Listing.AgentImageContainer>
            <Listing.AgentName>
              <Listing.Anchor to={`/agents/${featured.agent.name}`}>
                {featured.agent.name}
              </Listing.Anchor>
            </Listing.AgentName>
          </Listing.AgentContainer> */}
        </Listing.BottomItem>
      </Listing.Bottom>
    </Listing>
  );
};

export default ListingItemContainer;
