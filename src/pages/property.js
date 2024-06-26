import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Section, Property, Form } from "../components";
import {
  HeaderContainer,
  ContactAgentContainer,
  FooterContainer,
} from "../containers";
import {
  PropertGallery,
  PropertyAddress,
  PropertyDescription,
} from "../partials/property_features_partial.js";
import { getRental, updateRental, deleteRental } from "../redux/actions";
import { selectCurrentRental } from "../redux/selectors/index.js";
import { useAuth0 } from "@auth0/auth0-react";
import { Image } from "../components/property/styles/property.js";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Listing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const property = useSelector(selectCurrentRental);
  // const [submitted, setSubmitted] = useState(false);
  const { isAuthenticated } = useAuth0();
  const { id } = useParams();
  const [btnText, setButtonText] = useState("Update Property");

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
    description: "",
    images: [],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFormData(property);
    }, 1000);
  }, [property]);

  useEffect(() => {
    dispatch(getRental(id));
  }, []);

  const initializeFormData = () => {
    if (formData.address === "") {
      setFormData(property);
    }
  };

  const updateProperty = (e) => {
    e.preventDefault();
    var data = {
      id: id,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      images: formData.images,
      description: formData.description,
    };

    dispatch(updateRental(data));
    setButtonText("Updating...");
    setTimeout(() => {
      setButtonText("Update Property");
    }, 2000);
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteRental(id));
    navigate("/");
  };

  const handleDeletePhoto = (e, idx) => {
    e.preventDefault();
    let imgAry = formData.images;
    imgAry.splice(idx, 1);
    let newFormDetails = { ...formData, images: imgAry };
    setFormData(newFormDetails);
  };

  const handleChange = (e, idx) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name.includes("image_")) {
      let newAry = formData.images.map((item, idx2) => {
        if (idx2 === idx) {
          return value;
        }
        return item;
      });
      let newFormDetails = { ...formData, images: newAry };
      console.log(newFormDetails);
      setFormData(newFormDetails);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <>
      <HeaderContainer bg="false" />
      {property && property.address ? (
        !isAuthenticated ? (
          <Section bgColor="--bs-fade-info">
            <Section.InnerContainer>
              <Property.Header>
                <Property.HeaderLeft>
                  <Property.Title>{property.address}</Property.Title>
                  <Property.Location>
                    <Property.Icon name="fas fa-map-marker-alt"></Property.Icon>
                    <Property.Text>{property.city}</Property.Text>
                  </Property.Location>
                </Property.HeaderLeft>
                <Property.HeaderRight>
                  <Property.Title>
                    Price {"   "}
                    {property.rent}
                    <Property.Span>
                      {property.type === "rental" ? "/ Month" : ""}
                    </Property.Span>
                  </Property.Title>
                </Property.HeaderRight>
              </Property.Header>
              <Property.Content>
                <Property.Left>
                  <PropertGallery image={property.images} />
                  {/* <PropertyFeatures features={property.features} /> */}
                  {/* <PropertyAmenities amenities={property.amenities} /> */}
                  {/* <PropertyAddress address={property.address} /> */}
                  <PropertyAddress
                    address={{
                      street: property.address,
                      city: property.city,
                      state: property.state,
                      zip: property.zip,
                    }}
                  />
                  <PropertyDescription description={property.description} />
                </Property.Left>
                <Property.Right>
                  <ContactAgentContainer property={property} />
                  {/* <PropertyRelatedContainer
                    property={property}
                    featured={filteredFeatured}
                  /> */}
                </Property.Right>
              </Property.Content>
            </Section.InnerContainer>
          </Section>
        ) : (
          <Section bgColor="--bs-fade-info">
            <Section.InnerContainer>
              <Property.Header>
                <Property.HeaderLeft>
                  <Property.Title>
                    {(formData && formData.address) || property.address}
                  </Property.Title>
                  <Property.Location>
                    <Property.Icon name="fas fa-map-marker-alt"></Property.Icon>
                    <Property.Text>
                      {(formData && formData.city) || property.city}
                    </Property.Text>
                  </Property.Location>
                </Property.HeaderLeft>
              </Property.Header>

              <Form>
                {formData &&
                  formData.images.map((image, idx) => {
                    return (
                      <Row
                        key={image + "." + idx}
                        style={{
                          marginBottom: "50px",
                          border: "3px solid rgba(0, 0, 255, 0.5)",
                          marginTop: "25px",
                          borderRadius: "25px",
                          padding: "20px",
                        }}
                      >
                        <div>Image {idx} </div>
                        <Form.FormGroup>
                          <Form.Input
                            type="text"
                            name="image_"
                            value={image}
                            onChange={(e) => handleChange(e, idx)}
                            onClick={initializeFormData}
                          />
                          <Image
                            src={image}
                            height="200"
                            style={{
                              justifyContent: "left",
                              marginTop: "20px",
                            }}
                          />
                          <Property.Button
                            onClick={(e) => handleDeletePhoto(e, idx)}
                          >
                            Delete
                          </Property.Button>
                        </Form.FormGroup>
                      </Row>
                    );
                  })}

                {formData && (
                  <>
                    <Form.FormGroup>
                      <Form.Input
                        type="text"
                        placeholder={formData.address}
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        onClick={initializeFormData}
                      />
                    </Form.FormGroup>
                    <Form.FormGroup>
                      <Form.Input
                        type="text"
                        placeholder={formData.city}
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        onClick={initializeFormData}
                      />
                    </Form.FormGroup>
                    <Form.FormGroup>
                      <Form.Input
                        type="text"
                        placeholder={formData.state}
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        onClick={initializeFormData}
                      />
                    </Form.FormGroup>
                    <Form.FormGroup>
                      <Form.Input
                        type="text"
                        placeholder={formData.zip}
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        onClick={initializeFormData}
                      />
                    </Form.FormGroup>

                    <Form.FormGroup>
                      <Form.TextArea
                        placeholder={formData.description}
                        name="description"
                        id=""
                        cols="30"
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                        onClick={initializeFormData}
                      ></Form.TextArea>
                    </Form.FormGroup>

                    <Form.FormGroup>
                      {/* <Form.SubmitInput
                        type="submit"
                        value={btnText}
                        disabled={btnText === "Updating..."}
                        onClick={(e) => updateProperty(e)}
                      /> */}
                      <Property.Button
                        onClick={(e) => updateProperty(e)}
                        disabled={btnText === "Updating..."}
                        style={{ marginRight: "20px" }}
                      >
                        {btnText}
                      </Property.Button>
                      <Property.Button
                        onClick={(e) => handleDelete(e)}
                        style={{ marginRight: "20px" }}
                      >
                        Delete Property
                      </Property.Button>
                      <Property.Button onClick={handleCancel}>
                        Cancel
                      </Property.Button>
                    </Form.FormGroup>
                  </>
                )}
              </Form>
            </Section.InnerContainer>
          </Section>
        )
      ) : null}
      <FooterContainer />
    </>
  );
};

export default Listing;