import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {
//   getProperty,
//   getFeaturedList,
// } from "../redux/actions/propertiesAction";
import { Section, Property, Form } from "../components";
import {
  HeaderContainer,
  ContactAgentContainer,
  //   PropertyRelatedContainer,
  FooterContainer,
} from "../containers";
import {
  PropertGallery,
  PropertyAddress,
  // PropertyAmenities,
  // PropertyFeatures,
  PropertyDescription,
} from "../partials/property_features_partial.js";
import { getRental, addRental } from "../redux/actions";
import { selectCurrentRental } from "../redux/selectors/index.js";
import { useAuth0 } from "@auth0/auth0-react";
import { Image } from "../components/property/styles/property.js";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const property = useSelector(selectCurrentRental);
  // const [submitted, setSubmitted] = useState(false);
  const { isAuthenticated } = useAuth0();
  //   const { id } = useParams();

  const [addPhotoFlag, setAddPhotoFlag] = useState(false);
  const [currentImageToAdd, setCurrentImageToAdd] = useState("");
  const [btnText, setButtonText] = useState("Add Listing");

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

  //   useEffect(() => {
  //     dispatch(getRental(id));
  //   }, [dispatch, id]);

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
      //   id: id,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      // images: tImages,
      images: formData.images,
      description: formData.description,
    };

    setButtonText("Creating Listing...");
    dispatch(addRental(data));
    // setSubmitted(true);
    setTimeout(() => {
      setButtonText("Creating Listing...");
      navigate("/");
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
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
            </Form.FormGroup>

            <Form.FormGroup>
              <Form.Input
                style={{
                  width: "25%",
                  display: "inline-block",
                  marginRight: "20px",
                  border: "1px solid var(--bs-blue)",
                  borderRadius: "15px",
                }}
                type="text"
                placeholder="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />

              <Form.Input
                style={{
                  width: "10%",
                  display: "inline-block",
                  marginRight: "20px",
                  border: "1px solid var(--bs-blue)",
                  borderRadius: "15px",
                }}
                type="text"
                placeholder="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />

              <Form.Input
                style={{
                  width: "10%",
                  display: "inline-block",
                  marginRight: "20px",
                  border: "1px solid var(--bs-blue)",
                  borderRadius: "15px",
                }}
                type="text"
                placeholder="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
              />
            </Form.FormGroup>

            <Form.FormGroup>
              <Form.Input
                style={{
                  width: "10%",
                  display: "inline-block",
                  marginRight: "20px",
                  border: "1px solid var(--bs-blue)",
                  borderRadius: "15px",
                }}
                type="text"
                placeholder="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
              <Form.Input
                style={{
                  width: "10%",
                  display: "inline-block",
                  marginRight: "20px",
                  border: "1px solid var(--bs-blue)",
                  borderRadius: "15px",
                }}
                type="text"
                placeholder="beds"
                name="beds"
                value={formData.beds}
                onChange={handleChange}
              />
              <Form.Input
                style={{
                  width: "10%",
                  display: "inline-block",
                  marginRight: "20px",
                  border: "1px solid var(--bs-blue)",
                  borderRadius: "15px",
                }}
                type="text"
                placeholder="baths"
                name="baths"
                value={formData.baths}
                onChange={handleChange}
              />

              <Form.Input
                style={{
                  width: "10%",
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
              <Form.Input
                style={{
                  width: "10%",
                  display: "inline-block",
                  marginRight: "20px",
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
                  width: "10%",
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
                  width: "10%",
                  display: "inline-block",
                  marginRight: "20px",
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
                  width: "10%",
                  display: "inline-block",
                  marginRight: "20px",
                  border: "1px solid var(--bs-blue)",
                  borderRadius: "15px",
                }}
                type="text"
                placeholder="cooling"
                name="cooling"
                value={formData.cooling}
                onChange={handleChange}
              />

              <Form.Input
                style={{
                  width: "10%",
                  display: "inline-block",
                  marginRight: "20px",
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
                  width: "10%",
                  display: "inline-block",
                  marginRight: "20px",
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
                      marginRight: "20px",
                      border: "1px solid var(--bs-blue)",
                      borderRadius: "10px",
                      width: "10%",
                      display: "inline-block",
                    }}
                  >
                    Add Photo
                  </Property.Button>

                  <Property.Button
                    onClick={(e) => createProperty(e)}
                    style={{
                      marginRight: "20px",
                      border: "1px solid var(--bs-blue)",
                      borderRadius: "10px",
                      width: "20%",
                      display: "inline-block",
                    }}
                  >
                    Create Listing
                  </Property.Button>

                  <Property.Button
                    onClick={(e) => handleCancel(e)}
                    style={{
                      marginRight: "20px",
                      border: "1px solid var(--bs-blue)",
                      borderRadius: "10px",
                      width: "20%",
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
