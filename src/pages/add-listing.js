import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Section, Property, Form } from "../components";
import { HeaderContainer, FooterContainer } from "../containers";
import { addRental } from "../redux/actions";
// import { useAuth0 } from "@auth0/auth0-react";
import { Image } from "../components/property/styles/property.js";
import {
  getFormErrorObject,
  formErrors,
  FormError,
} from "../helpers/form_validation.js";

const AddListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { isAuthenticated } = useAuth0();
  const [addPhotoFlag, setAddPhotoFlag] = useState(false);
  const [currentImageToAdd, setCurrentImageToAdd] = useState("");
  const [btnText, setButtonText] = useState("Create Listing");

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
    price: "",
    description: "",
    images: [],
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

  const doesFormHaveErrors = () => {
    return (
      formErrorObject.addressError ||
      formErrorObject.cityError ||
      formErrorObject.stateError ||
      formErrorObject.zipError ||
      formErrorObject.priceError ||
      formErrorObject.bedsError ||
      formErrorObject.bathsError ||
      formErrorObject.sqftError ||
      formErrorObject.descriptionError
    );
  };

  const createProperty = (e) => {
    e.preventDefault();
    // let tImages = []
    // Object.entries(formData).forEach(([key, value]) => {
    //     if (key.includes('image_')) {
    //       let idx = key.split("_").pop();
    //       formData[key] = value
    //       tImages.push(value)
    //     } else {
    //       formData[key] = value
    //     }
    // })

    var data = {
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      images: formData.images,
      description: formData.description,
    };
    setButtonText("Creating Listing...");
    dispatch(addRental(data));
    setTimeout(() => {
      setButtonText("Create Listing");
      navigate("/");
    }, 2000);
  };

  const checkEmptyFormFields = () => {
    for (const v of Object.values(formData)) {
      if (v === "") return true;
    }
    return false;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let obj = getFormErrorObject(name, value, formErrorObject);
    let newObj = { ...formErrorObject, ...obj };
    setFormErrorObject({ ...formErrorObject, ...newObj });
    // setErrorElement(getErrorElement(name, value));
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddPhoto = (e) => {
    e.preventDefault();
    setAddPhotoFlag(true);
  };

  const handleCancelAddPhoto = (e) => {
    e.preventDefault();
    setAddPhotoFlag(false);
    setCurrentImageToAdd("");
  };

  const handleAddNewPhoto = (e) => {
    e.preventDefault();
    setCurrentImageToAdd(e.target.value);
  };

  const handleAddPhotoToNewListing = (e) => {
    e.preventDefault();
    let currentListingImages = formData.images;
    currentListingImages.push(currentImageToAdd);
    setFormData({ ...formData, images: currentListingImages });
    setAddPhotoFlag(false);
    setCurrentImageToAdd("");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <HeaderContainer bg="false" />
      <Section bgColor="--bs-fade-info">
        <Section.InnerContainer>
          <Form>
            <Form.FormGroup>
              <Form.Input
                style={{
                  border: "1px solid var(--bs-blue)",
                  borderRadius: "15px",
                }}
                type="text"
                placeholder="street"
                name="address"
                value={formData.address}
                // onChange={(e) => setStreet(e.target.value)}
                onChange={handleChange}
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
                placeholder="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
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
                placeholder="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
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
                placeholder="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
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
                value={formData.price}
                onChange={handleChange}
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
                value={formData.beds}
                onChange={handleChange}
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
                value={formData.baths}
                onChange={handleChange}
              />
              {formErrorObject.bathsError && (
                <FormError msg={formErrors["baths"].error} />
              )}
              <Form.Input
                style={{
                  width: "20%",
                  display: "inline-block",
                  marginRight: "20px",
                  border: "1px solid var(--bs-blue)",
                  borderRadius: "15px",
                }}
                type="text"
                placeholder="sqft"
                name="sqft"
                value={formData.sqft}
                onChange={handleChange}
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
                value={formData.type}
                onChange={handleChange}
              />
              <Form.Input
                style={{
                  width: "20%",
                  display: "inline-block",
                  marginRight: "20px",
                  border: "1px solid var(--bs-blue)",
                  borderRadius: "15px",
                }}
                type="text"
                placeholder="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
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
                value={formData.heating}
                onChange={handleChange}
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
                value={formData.cooling}
                onChange={handleChange}
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
                value={formData.hoa}
                onChange={handleChange}
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
                value={formData.parcelNumber}
                onChange={handleChange}
              />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.TextArea
                style={{
                  border: "1px solid var(--bs-blue)",
                  borderRadius: "15px",
                }}
                placeholder="description"
                name="description"
                id=""
                cols="30"
                rows="5"
                value={formData.description}
                onChange={handleChange}
              ></Form.TextArea>
              {formErrorObject.descriptionError && (
                <FormError msg={formErrors["description"].error} />
              )}
            </Form.FormGroup>
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
                        // onClick={initializeFormData}
                      />
                      <Image
                        src={image}
                        height="200"
                        style={{
                          justifyContent: "left",
                          marginTop: "20px",
                        }}
                      />
                    </Form.FormGroup>
                  </Row>
                );
              })}
            {addPhotoFlag && (
              <Row
                style={{
                  marginBottom: "50px",
                  border: "3px solid rgba(0, 0, 255, 0.5)",
                  marginTop: "25px",
                  borderRadius: "25px",
                  padding: "20px",
                }}
              >
                <div>Image: </div>
                <Form.FormGroup>
                  <Form.Input
                    style={{ marginBottom: "20px" }}
                    type="text"
                    name="image_"
                    onChange={(e) => handleAddNewPhoto(e)}
                  />
                  {currentImageToAdd ? (
                    <Image
                      src={currentImageToAdd}
                      height="200"
                      style={{
                        justifyContent: "left",
                      }}
                    />
                  ) : null}
                  <Property.Button
                    style={{
                      marginRight: "20px",
                      border: "1px solid var(--bs-blue)",
                      borderRadius: "10px",
                      width: "10%",
                    }}
                    onClick={(e) => handleAddPhotoToNewListing(e)}
                  >
                    Add
                  </Property.Button>
                  <Property.Button
                    onClick={(e) => handleCancelAddPhoto(e)}
                    style={{
                      marginRight: "20px",
                      border: "1px solid var(--bs-blue)",
                      borderRadius: "10px",
                      width: "10%",
                    }}
                  >
                    Cancel
                  </Property.Button>
                </Form.FormGroup>
              </Row>
            )}
            {!addPhotoFlag ? (
              <>
                <Form.FormGroup>
                  <Property.Button
                    onClick={(e) => handleAddPhoto(e)}
                    style={{
                      marginRight: "3%",
                      border: "1px solid var(--bs-blue)",
                      borderRadius: "10px",
                      width: "25%",
                      display: "inline-block",
                    }}
                  >
                    <i className="fa fa-solid fa-camera"></i>&nbsp; Add Photo
                  </Property.Button>
                  <Property.Button
                    onClick={(e) => createProperty(e)}
                    style={{
                      marginRight: "3%",
                      border: "1px solid var(--bs-blue)",
                      borderRadius: "10px",
                      width: "33%",
                      display: "inline-block",
                      color:
                        checkEmptyFormFields() || doesFormHaveErrors()
                          ? "lightgrey"
                          : "white",
                    }}
                    disabled={
                      btnText == "Create Listing" ||
                      checkEmptyFormFields() ||
                      doesFormHaveErrors()
                    }
                  >
                    <i className="fa fa-solid fa-plus"></i>&nbsp; {btnText}
                  </Property.Button>
                  <Property.Button
                    onClick={(e) => handleCancel(e)}
                    style={{
                      marginRight: "3%",
                      border: "1px solid var(--bs-blue)",
                      borderRadius: "10px",
                      width: "17%",
                      display: "inline-block",
                    }}
                  >
                    Cancel
                  </Property.Button>
                  {/* <Form.SubmitInput
                    type="submit"
                    value="Add Rental Property"
                    onClick={(e) => createProperty(e)}
                    style={{ 
                      marginRight: "20px",   
                      border: "1px solid var(--bs-blue)",
                      borderRadius: "10px",
                      width: "10%"
                    }}
                  /> */}
                </Form.FormGroup>
              </>
            ) : null}
          </Form>
        </Section.InnerContainer>
      </Section>
      <FooterContainer />
    </>
  );
};

export default AddListing;
