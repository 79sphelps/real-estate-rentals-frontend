import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Listing } from "../components";

const ListingItemContainer = ({ featured, width }) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const imgStyle = {
    width: "100%",
    display: "inline-block",
    transition: "transform 0.3s ease-in-out",
    backgroundColor: isHover && "#fff",
    color: isHover && "#1b69dfed",
    border: isHover && "1px solid #1b69dfed",
    transform: isHover && "scale(1.1)",
  };

  return (
    <>
      {featured && featured.images ? (
        <Listing width={width}>
          <Listing.Top>
            <LazyLoadImage
              alt="A beautiful landscape"
              // height={400}
              src={featured.images[0]}
              // width={600}
              width={"100%"}
              effect="blur"
              onClick={() => navigate(`/rentals/${featured._id}`)}
              style={imgStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            <Listing.TopItem>
              <Listing.TopItemContainer>
                <Listing.TopItemInfo>
                  <Listing.Icon></Listing.Icon>
                  <Listing.Text location>
                    {featured && featured.address}
                  </Listing.Text>
                </Listing.TopItemInfo>
              </Listing.TopItemContainer>
            </Listing.TopItem>
          </Listing.Top>
          <Listing.Bottom>
            <Listing.BottomItem>
              <Listing.Title>
                <Listing.Anchor
                  to={`/rentals/${featured._id}`}
                  style={{ textDecoration: "none" }}
                >
                  {featured && featured.address}
                </Listing.Anchor>
              </Listing.Title>
              <Listing.Price>Price: {featured.price}</Listing.Price>
              <Listing.Text description>
                {featured.description && featured.description.substring(0, 100)}
              </Listing.Text>
              <Listing.Button>
                <Listing.Anchor
                  to={`/rentals/${featured._id}`}
                  style={{ textDecoration: "none" }}
                >
                  Details
                </Listing.Anchor>
              </Listing.Button>
              <Listing.AgentContainer>
                <Listing.AgentImageContainer>
                  <Listing.Image
                    // src={`/images/agents/${featured.agent.image}`}
                    src="https://jls-documents-prod.s3.amazonaws.com/public/users/300002725-3204b409/Tessa%20body%20shot_clipped_rev_2.png"
                    profile="true"
                  />
                </Listing.AgentImageContainer>
                <Listing.AgentName>
                  {/* <Listing.Anchor to={`/agents/${featured.agent.name}`}>
                    {featured.agent.name}
                  </Listing.Anchor> */}
                  <Listing.Anchor
                    to={`/listings`}
                    style={{ textDecoration: "none" }}
                  >
                    Tessa Goldy
                  </Listing.Anchor>
                </Listing.AgentName>
              </Listing.AgentContainer>
            </Listing.BottomItem>
          </Listing.Bottom>
        </Listing>
      ) : null}
    </>
  );
};

export default ListingItemContainer;
