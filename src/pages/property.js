import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import {
  HeaderContainer,
  ContactAgentContainer,
  FooterContainer,
} from "../containers";
import { Section, Property, Form, Loading } from "../components";
import { Image } from "../components/property/styles/property.js";
import { getRental, updateRental } from "../redux/actions";
import { selectCurrentRental } from "../redux/selectors/index.js";
import {
  PropertGallery,
  PropertyAdditionalDetails,
  PropertyAddress,
  PropertyDescription,
} from "../partials/property_features_partial.js";
import {
  getFormErrorObject,
  formErrors,
  FormError,
} from "../helpers/form_validation.js";
// import 'bootstrap/dist/css/bootstrap.min.css';

const Listing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const property = useSelector(selectCurrentRental);
  const { isAuthenticated } = useAuth0();
  const { id } = useParams();
  const [btnText, setButtonText] = useState("Update Property");

  let initialFormErrorObject = {
    addressError: false,
    cityError: false,
    stateError: false,
    zipError: false,
    priceError: false,
    bedsError: false,
    bathsError: false,
    sqftError: false,
    descriptionError: false,
  };

  const [formErrorObject, setFormErrorObject] = useState(
    initialFormErrorObject
  );

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
    return (
      // formErrorObject.addressError ||
      // formErrorObject.cityError ||
      // formErrorObject.stateError ||
      // formErrorObject.zipError ||
      // formErrorObject.priceError ||
      // formErrorObject.bedsError ||
      // formErrorObject.bathsError ||
      // formErrorObject.sqftError ||
      // formErrorObject.descriptionError ||
      Object.values(formErrorObject).map((v) => { if (v) return true }).includes(true) || 
      Object.values(formData).map((v) => { if (v === "") return true }).includes(true)
    );
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
      // validateInput(name, value);
      let obj = getFormErrorObject(name, value, formErrorObject);
      let newObj = { ...formErrorObject, ...obj };
      setFormErrorObject({ ...formErrorObject, ...newObj });
      // setErrorElement(getErrorElement(name, value));
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
                      {formErrorObject.addressError && (
                        <FormError msg={formErrors["address"].error} />
                      )}
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
                      {formErrorObject.cityError && (
                        <FormError msg={formErrors["city"].error} />
                      )}
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
                      {formErrorObject.stateError && (
                        <FormError msg={formErrors["state"].error} />
                      )}
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
                      {formErrorObject.zipError && (
                        <FormError msg={formErrors["zip"].error} />
                      )}
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
                      {formErrorObject.priceError && (
                        <FormError msg={formErrors["price"].error} />
                      )}
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
                      {formErrorObject.bedsError && (
                        <FormError msg={formErrors["beds"].error} />
                      )}
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
                      {formErrorObject.bathsError && (
                        <FormError msg={formErrors["baths"].error} />
                      )}
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
                      {formErrorObject.sqftError && (
                        <FormError msg={formErrors["sqft"].error} />
                      )}
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
                      {formErrorObject.descriptionError && (
                        <FormError msg={formErrors["description"].error} />
                      )}
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
                        style={
                          doesFormHaveErrors()
                            ? { color: "lightgrey", marginRight: "20px" }
                            : { marginRight: "20px" }
                        }
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
