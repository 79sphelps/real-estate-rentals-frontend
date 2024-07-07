import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Section, Property } from "../components";
import {
  HeaderContainer,
  FooterContainer,
} from "../containers";
import {
  getRentals,
  getRental,
  deleteRental,
} from "../redux/actions";
import { selectCurrentRental } from "../redux/selectors/index.js";
import { useAuth0 } from "@auth0/auth0-react";
import { Image } from "../components/property/styles/property.js";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";
// import 'bootstrap/dist/css/bootstrap.min.css';

const DeleteListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const property = useSelector(selectCurrentRental);
  const { isAuthenticated } = useAuth0();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    address: "",
    city: "",
  });

  useEffect(() => {
    dispatch(getRental(id));
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFormData(property);
    }, 1000);
  }, [property]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteRental(id));
    dispatch(getRentals());
    navigate("/");
  };

  const handleCancelDeleteModal = (e) => {
    e.preventDefault();
    navigate("/rentals/" + id);
  };

  if (!formData || formData.address === "") {
    return <Loading />;
  }

  return (
    <>
      <HeaderContainer bg="false" />
      {property && property.address && isAuthenticated ? (
        <Section bgColor="--bs-fade-info">
          <Section.InnerContainer
            style={{
              padding: "20px",
              borderRadius: "20px",
              cursor: "pointer",
              resize: "none",
              fontSize: "1rem",
              background: "#f6f8fd",
              boxShadow: "0px 0px 5px 0px #274684",
              // border: "1px solid #edf0f9"
              border: "1px solid var(--bs-light)",
            }}
          >
            <Property.Header>
              <Property.HeaderLeft>
                <Property.Title>
                  <div style={{ marginBottom: "20px" }}>
                    Do you really want to delete this property?
                  </div>
                  {(formData && formData.address) || property.address}
                </Property.Title>
                <Property.Location>
                  <Property.Icon name="fas fa-map-marker-alt"></Property.Icon>
                  <Property.Text>
                    {(formData && formData.city) || property.city}
                  </Property.Text>
                </Property.Location>
                <Image
                  src={property.images[0]}
                  height="200"
                  style={{
                    justifyContent: "left",
                    marginTop: "20px",
                  }}
                />
              </Property.HeaderLeft>
            </Property.Header>

            <Property.AdminEditPhotoCardButton
              variant="secondary"
              onClick={handleDelete}
              style={{
                width: "25%",
                // marginLeft: "100px",
                marginRight: "3%",
              }}
            >
              Delete Property
            </Property.AdminEditPhotoCardButton>
            <Property.AdminEditPhotoCardButton
              variant="secondary"
              onClick={handleCancelDeleteModal}
            >
              Cancel
            </Property.AdminEditPhotoCardButton>
          </Section.InnerContainer>
        </Section>
      ) : null}
      <FooterContainer />
    </>
  );
};

export default DeleteListing;
