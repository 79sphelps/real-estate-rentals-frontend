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
  PropertyAdditionalDetails,
  PropertyAddress,
  PropertyDescription,
} from "../partials/property_features_partial.js";
import {
  getRentals,
  getRental,
  updateRental,
  deleteRental,
} from "../redux/actions";
import { selectCurrentRental } from "../redux/selectors/index.js";
import { useAuth0 } from "@auth0/auth0-react";
import { Image } from "../components/property/styles/property.js";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";
// import 'bootstrap/dist/css/bootstrap.min.css';

const Listing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const property = useSelector(selectCurrentRental);
  const { isAuthenticated } = useAuth0();
  const { id } = useParams();
  const [btnText, setButtonText] = useState("Update Property");

  const [formHasErrors, setFormHasErrors] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [zipError, setZipError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [bedsError, setBedsError] = useState(false);
  const [bathsError, setBathsError] = useState(false);
  const [sqftError, setSqftError] = useState(false);
  const [descripError, setDescripError] = useState(false);


  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
    description: "",
    images: [],
    price: "",
    beds: "",
    baths: "",
    sqft: "",
    type: "",
    year: "",
    heating: "",
    cooling: "",
    hoa: "",
    parcelNumber: "",
  });

  useEffect(() => {
    dispatch(getRental(id));
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setFormData(property);
  }, [property]);

  const initializeFormData = () => {
    if (formData.address === "") {
      setFormData(property);
    }
  };

  const doesFormHaveErrors = () => {
    return addressError || cityError || stateError || zipError || priceError || bedsError || bathsError || sqftError || descripError
  }

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
      price: formData.price,
      beds: formData.beds,
      baths: formData.baths,
      sqft: formData.sqft,
      type: formData.type,
      year: formData.year,
      heating: formData.heating,
      cooling: formData.cooling,
      hoa: formData.hoa,
      parcelNumber: formData.parcelNumber,
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

  // const handleDeletePhoto = (e, idx) => {
  //   e.preventDefault();
  //   let imgAry = formData.images;
  //   imgAry.splice(idx, 1);
  //   let newFormDetails = { ...formData, images: imgAry };
  //   setFormData(newFormDetails);
  // };

  const validateInput = (name, value) => {
    switch (name) {
      case "address":
        value.length < 15 ? setAddressError(true) : setAddressError(false);
        break;
      case "city":
        value.length < 1 ? setCityError(true) : setCityError(false);
        break;
      case "state":
        value.length !== 2 ? setStateError(true) : setStateError(false);
        break;
      case "zip":
        let pattern = /^\d{5}(?:[-\s]\d{4})?$/;
        !pattern.test(value) ? setZipError(true) : setZipError(false);
        break;
      case "price":
        let pricePattern = /^\$\d+(?:[.,]\d+)*$/;
        !pricePattern.test(value) ? setPriceError(true) : setPriceError(false);
        break;
      case "beds":
        let bedPattern = /^\d{1}(?:.\d{1})*$/;
        !bedPattern.test(value) ? setBedsError(true) : setBedsError(false);
        break;
      case "baths":
        let bathPattern = /^\d{1}(?:.\d{1})*$/;
        !bathPattern.test(value) ? setBathsError(true) : setBathsError(false);
        break;
      case "sqft":
        let sqftPattern = /^\d{1,3}(,\d{3})*(\.\d+)?$/;
        !sqftPattern.test(value) ? setSqftError(true) : setSqftError(false);
        break;
      case "description":
        value.length < 25 ? setDescripError(true) : setDescripError(false);
        break; 
      default:
        break;
    }
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
      setFormData(newFormDetails);
    } else {
      validateInput(name, value);
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDeleteModal = (e, idx) => {
    e.preventDefault();
    navigate("/rentals/delete/" + id);
  };

  if (
    !property ||
    !("address" in property) // (!formData || formData.address === "")
  ) {
    return <Loading />;
  }

  return (
    <>
      <HeaderContainer bg="false" />
      {property && "address" in property ? (
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
                    {property.price}
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
                  <PropertyAdditionalDetails property={property} />
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
                          border: "3px solid #1b69dfed",
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
                          <Property.AdminEditPhotoCardButton
                            onClick={(e) => handleDeleteModal(e, idx)}
                          >
                            Delete
                          </Property.AdminEditPhotoCardButton>
                        </Form.FormGroup>
                      </Row>
                    );
                  })}

                {formData && (
                  <>
                    <Form.FormGroup>
                      <Form.Input
                        style={{
                          border: "1px solid var(--bs-blue)",
                          borderRadius: "15px",
                        }}
                        type="text"
                        placeholder={formData.address || ""}
                        name="address"
                        value={formData.address || ""}
                        onChange={handleChange}
                        onClick={initializeFormData}
                      />
                      {addressError ? (
                        <div
                          style={{
                            color: "red",
                            paddingTop: "5px",
                            paddingBottom: "15px",
                          }}
                        >
                          Address must be more than 15 characters to be valid.
                        </div>
                      ) : null}
                    </Form.FormGroup>

                    <Form.FormGroup>
                      <Form.Input
                        style={{
                          width: "50%",
                          display: "inline-block",
                          marginRight: "3%",
                          border: "1px solid var(--bs-blue)",
                          borderRadius: "15px",
                        }}
                        type="text"
                        placeholder={formData.city || ""}
                        name="city"
                        value={formData.city || ""}
                        onChange={handleChange}
                        onClick={initializeFormData}
                      />
                      {cityError ? (
                        <div
                          style={{
                            color: "red",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                          }}
                        >
                          City must be more than 1 character to be valid.
                        </div>
                      ) : null}

                      <Form.Input
                        style={{
                          width: "10%",
                          display: "inline-block",
                          marginRight: "3%",
                          border: "1px solid var(--bs-blue)",
                          borderRadius: "15px",
                        }}
                        type="text"
                        placeholder={formData.state || ""}
                        name="state"
                        value={formData.state || ""}
                        onChange={handleChange}
                        onClick={initializeFormData}
                      />
                      {stateError ? (
                        <div
                          style={{
                            color: "red",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                          }}
                        >
                          State code must be 2 characters to be valid.
                        </div>
                      ) : null}

                      <Form.Input
                        style={{
                          width: "20%",
                          display: "inline-block",
                          // marginRight: "20px",
                          border: "1px solid var(--bs-blue)",
                          borderRadius: "15px",
                        }}
                        type="text"
                        placeholder={formData.zip || ""}
                        name="zip"
                        value={formData.zip || ""}
                        onChange={handleChange}
                        onClick={initializeFormData}
                      />
                      {zipError ? (
                        <div
                          style={{
                            color: "red",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                          }}
                        >
                          Zip code not valid.
                        </div>
                      ) : null}
                    </Form.FormGroup>

                    <Form.FormGroup>
                      <Form.Input
                        style={{
                          width: "30%",
                          display: "inline-block",
                          marginRight: "3%",
                          border: "1px solid var(--bs-blue)",
                          borderRadius: "15px",
                        }}
                        type="text"
                        placeholder="price"
                        name="price"
                        value={formData.price || ""}
                        onChange={handleChange}
                        onClick={initializeFormData}
                      />
                      {priceError ? (
                        <div
                          style={{
                            color: "red",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                          }}
                        >
                          Price is not valid.
                        </div>
                      ) : null}
                      <Form.Input
                        style={{
                          width: "10%",
                          display: "inline-block",
                          marginRight: "3%",
                          border: "1px solid var(--bs-blue)",
                          borderRadius: "15px",
                        }}
                        type="text"
                        placeholder="beds"
                        name="beds"
                        value={formData.beds || ""}
                        onChange={handleChange}
                        onClick={initializeFormData}
                      />
                      {bedsError ? (
                        <div
                          style={{
                            color: "red",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                          }}
                        >
                          Beds must be of form "4" or "4.1"
                        </div>
                      ) : null}
                      <Form.Input
                        style={{
                          width: "10%",
                          display: "inline-block",
                          marginRight: "3%",
                          border: "1px solid var(--bs-blue)",
                          borderRadius: "15px",
                        }}
                        type="text"
                        placeholder="baths"
                        name="baths"
                        value={formData.baths || ""}
                        onChange={handleChange}
                        onClick={initializeFormData}
                      />
                      {bathsError ? (
                        <div
                          style={{
                            color: "red",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                          }}
                        >
                          Baths must be of form "4" or "4.1"
                        </div>
                      ) : null}
                      <Form.Input
                        style={{
                          width: "20%",
                          display: "inline-block",
                          // marginRight: "20px",
                          border: "1px solid var(--bs-blue)",
                          borderRadius: "15px",
                        }}
                        type="text"
                        placeholder="sqft"
                        name="sqft"
                        value={formData.sqft || ""}
                        onChange={handleChange}
                        onClick={initializeFormData}
                      />
                      {sqftError ? (
                        <div
                          style={{
                            color: "red",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                          }}
                        >
                          Square footage must be of form '3000' or '3,450'
                        </div>
                      ) : null}
                    </Form.FormGroup>

                    <Form.FormGroup>
                      <Form.Input
                        style={{
                          width: "30%",
                          display: "inline-block",
                          marginRight: "3%",
                          border: "1px solid var(--bs-blue)",
                          borderRadius: "15px",
                        }}
                        type="text"
                        placeholder="type"
                        name="type"
                        value={formData.type || ""}
                        onChange={handleChange}
                        onClick={initializeFormData}
                      />
                      <Form.Input
                        style={{
                          width: "20%",
                          display: "inline-block",
                          marginRight: "3%",
                          border: "1px solid var(--bs-blue)",
                          borderRadius: "15px",
                        }}
                        type="text"
                        placeholder="year"
                        name="year"
                        value={formData.year || ""}
                        onChange={handleChange}
                        onClick={initializeFormData}
                      />
                    </Form.FormGroup>

                    <Form.FormGroup>
                      <Form.Input
                        style={{
                          width: "35%",
                          display: "inline-block",
                          marginRight: "3%",
                          border: "1px solid var(--bs-blue)",
                          borderRadius: "15px",
                        }}
                        type="text"
                        placeholder="heating"
                        name="heating"
                        value={formData.heating || ""}
                        onChange={handleChange}
                        onClick={initializeFormData}
                      />
                      <Form.Input
                        style={{
                          width: "35%",
                          display: "inline-block",
                          marginRight: "3%",
                          border: "1px solid var(--bs-blue)",
                          borderRadius: "15px",
                        }}
                        type="text"
                        placeholder="cooling"
                        name="cooling"
                        value={formData.cooling || ""}
                        onChange={handleChange}
                        onClick={initializeFormData}
                      />
                    </Form.FormGroup>

                    <Form.FormGroup>
                      <Form.Input
                        style={{
                          width: "20%",
                          display: "inline-block",
                          marginRight: "3%",
                          border: "1px solid var(--bs-blue)",
                          borderRadius: "15px",
                        }}
                        type="text"
                        placeholder="hoa"
                        name="hoa"
                        value={formData.hoa || ""}
                        onChange={handleChange}
                        onClick={initializeFormData}
                      />
                      <Form.Input
                        style={{
                          width: "60%",
                          display: "inline-block",
                          // marginRight: "20px",
                          border: "1px solid var(--bs-blue)",
                          borderRadius: "15px",
                        }}
                        type="text"
                        placeholder="parcelNumber"
                        name="parcelNumber"
                        value={formData.parcelNumber || ""}
                        onChange={handleChange}
                        onClick={initializeFormData}
                      />
                    </Form.FormGroup>

                    <Form.FormGroup>
                      <Form.TextArea
                        style={{
                          border: "1px solid var(--bs-blue)",
                          borderRadius: "15px",
                        }}
                        placeholder={formData.description || ""}
                        name="description"
                        id=""
                        cols="30"
                        rows="5"
                        value={formData.description || ""}
                        onChange={handleChange}
                        onClick={initializeFormData}
                      ></Form.TextArea>
                      {descripError ? (
                        <div
                          style={{
                            color: "red",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                          }}
                        >
                          Please enter a description of at least 25 characters in length.
                        </div>
                      ) : null}
                    </Form.FormGroup>

                    <Form.FormGroup>
                      {/* <Form.SubmitInput
                        type="submit"
                        value={btnText}
                        disabled={btnText === "Updating..."}
                        onClick={(e) => updateProperty(e)}
                      /> */}

                      <Property.AdminEditPhotoCardButton
                        onClick={(e) => updateProperty(e)}
                        disabled={
                          btnText === "Updating..." || doesFormHaveErrors()
                        }
                        style={doesFormHaveErrors() ? { color: "lightgrey", marginRight: "20px" } : { marginRight: "20px" }}
                      >
                        {btnText}
                      </Property.AdminEditPhotoCardButton>

                      <Property.AdminEditPhotoCardButton
                        onClick={(e) => handleDeleteModal(e)}
                        style={{ marginRight: "20px" }}
                      >
                        Delete Property
                      </Property.AdminEditPhotoCardButton>

                      <Property.AdminEditPhotoCardButton
                        onClick={handleCancel}
                        style={{ marginRight: "20px" }}
                      >
                        Cancel
                      </Property.AdminEditPhotoCardButton>
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
