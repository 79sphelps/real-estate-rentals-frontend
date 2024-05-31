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
import { getRental, updateRental } from "../redux/actions";
import { selectCurrentRental } from "../redux/selectors/index.js";
import { useAuth0 } from "@auth0/auth0-react";
import { Image } from "../components/property/styles/property.js"

const Listing = () => {
  const dispatch = useDispatch();
  const property = useSelector(selectCurrentRental);
  // const [submitted, setSubmitted] = useState(false);
  const { isAuthenticated } = useAuth0();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zip: '',
    description_1: '',
    description_2: '',
    description_3: '',
    description_4: '',
    description_5: '',
    description_6: '',
    description_7: '',
    image_1: '',
    image_2: '',
    image_3: '',
    image_4: '',
    image_5: '',
    image_6: '',
    image_7: '',
    image_8: ''
  })

  useEffect(() => {
    dispatch(getRental(id));
  }, [dispatch, id]);

  const updateProperty = (e) => {
    e.preventDefault();

    let tImages = []
    Object.entries(formData).forEach(([key, value]) => {
        if (key.includes('image_')) {
          let idx = key.split("_").pop();
          formData[key] = value ? value : property.images[idx-1]
          tImages.push(value ? value : property.images[idx-1])
        } else {
          formData[key] = value ? value : property[key]
        }
    })

    var data = {
      id: id,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      images: tImages,
      description_1: formData.description_1,
      description_2: formData.description_2,
      description_3: formData.description_3,
      description_4: formData.description_4,
      description_5: formData.description_5,
      description_6: formData.description_6,
      description_7: formData.description_7
    };

    dispatch(updateRental(data));
    // setSubmitted(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  //   const singleProperty = useSelector((state) => state.property);
  //   const featuredList = useSelector((state) => state.featuredProperty);
  //   const { featured: featuredProperties } = featuredList;
  //   const { property } = singleProperty;

  // To display featured properties except one with the id
  //   const filteredFeatured = featuredProperties.filter(
  //     (property) => property.id !== +id
  //   );

  return (
    <>
      <HeaderContainer bg="false" />
      {property ? (
        !isAuthenticated ? (
          <Section bgColor="--bs-fade-info">
            <Section.InnerContainer>
              <Property.Header>
                <Property.HeaderLeft>
                  {/* <Property.Title>{property.title}</Property.Title> */}
                  <Property.Title>{property.address}</Property.Title>
                  <Property.Location>
                    <Property.Icon name="fas fa-map-marker-alt"></Property.Icon>
                    {/* <Property.Text>{property.location}</Property.Text> */}
                    <Property.Text>{property.city}</Property.Text>
                  </Property.Location>
                </Property.HeaderLeft>
                <Property.HeaderRight>
                  <Property.Title>
                    Rent {"   "}
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
                  <PropertyDescription
                    description={
                      property.description_1 +
                      "<hr><hr>" +
                      property.description_2 +
                      "/n/n" +
                      property.description_3 +
                      "/n/n" +
                      property.description_4
                    }
                  />
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
                  {/* <Property.Title>{property.title}</Property.Title> */}
                  <Property.Title>{property.address}</Property.Title>
                  <Property.Location>
                    <Property.Icon name="fas fa-map-marker-alt"></Property.Icon>
                    {/* <Property.Text>{property.location}</Property.Text> */}
                    <Property.Text>{property.city}</Property.Text>
                  </Property.Location>
                </Property.HeaderLeft>
                
              </Property.Header>

              <Form>
                {/* {property &&
                  property.images &&
                  property.images.length > 0 &&
                  property.images.map((photo, idx) => (
                    <Form.FormGroup>
                      <Form.Input
                        type="text"
                        placeholder={photo}
                        // name="image_1"
                        name="images"
                        value={property.images[idx]}
                        onChange={handleChange}
                      />
                      <Image src={photo} height="100" />
                    </Form.FormGroup>
                  ))} */}

              <Form.FormGroup>
                <Form.Input
                  type="text"
                  placeholder={property.images[0]}
                  name="image_1"
                  value={(property && property.images[0]) || formData.image_1}
                  onChange={handleChange}
                />
  
                 <Image src={property.images[0]} height="100" />
              </Form.FormGroup>

              <Form.FormGroup>
                <Form.Input
                  type="text"
                  placeholder={property.images[1]}
                  name="image_2"
                  value={(property && property.images[1]) || formData.image_2}
                  onChange={handleChange}
                />

                 <Image src={property.images[1]} height="100" />
              </Form.FormGroup>

              <Form.FormGroup>
                <Form.Input
                  type="text"
                  placeholder={property.images[2]}
                  name="image_3"
                  value={(property && property.images[2]) || formData.image_3}
                  onChange={handleChange}
                />

                 <Image src={property.images[2]} height="100" />
              </Form.FormGroup>

              <Form.FormGroup>
                <Form.Input
                  type="text"
                  placeholder={property.images[3]}
                  name="image_4"
                  value={(property && property.images[3]) || formData.image_4}
                  onChange={handleChange}
                />

                 <Image src={property.images[3]} height="100" />
              </Form.FormGroup>

              <Form.FormGroup>
                <Form.Input
                  type="text"
                  placeholder={property.images[4]}
                  name="image_5"
                  value={(property && property.images[4]) || formData.image_5}
                  onChange={handleChange}
                />
         
                 <Image src={property.images[4]} height="100" />
              </Form.FormGroup>

              <Form.FormGroup>
                <Form.Input
                  type="text"
                  placeholder={property.images[5]}
                  name="image_6"
                  value={(property && property.images[5]) || formData.image_6}
                  onChange={handleChange}
                />

                 <Image src={property.images[5]} height="100" />
              </Form.FormGroup>

              <Form.FormGroup>
                <Form.Input
                  type="text"
                  placeholder={property.images[6]}
                  name="image_7"
                  value={(property && property.images[6]) || formData.image_7}
                  onChange={handleChange}
                />
  
                 <Image src={property.images[6]} height="100" />
              </Form.FormGroup>

              <Form.FormGroup>
                <Form.Input
                  type="text"
                  placeholder={property.images[7]}
                  name="image_8"
                  value={(property && property.images[7]) || formData.image_8}
                  onChange={handleChange}
                />
                 <Image src={property.images[7]} height="100" />
              </Form.FormGroup>

                <Form.FormGroup>
                  <Form.Input
                    type="text"
                    placeholder={property.address}
                    name="address"
                    value={(property && property.address) || formData.address}
                    // onChange={(e) => setStreet(e.target.value)}
                    onChange={handleChange}
                  />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Input
                    type="text"
                    placeholder={property.city}
                    name="city"
                    value={(property && property.city) || formData.city}
                    // onChange={(e) => setCity(e.target.value)}
                    onChange={handleChange}
                  />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Input
                    type="text"
                    placeholder={property.state}
                    name="state"
                    value={(property && property.state) || formData.state}
                    // onChange={(e) => setState(e.target.value)}
                    onChange={handleChange}
                  />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Input
                    type="text"
                    placeholder={property.zip}
                    name="zip"
                    // value={formData && formData.zip ? formData.zip : ''}
                    value={(property && property.zip) || formData.zip}
                    // onChange={(e) => setZip(e.target.value)}
                    onChange={handleChange}
                  />
                </Form.FormGroup>

                <Form.FormGroup>
                  {/* <Form.Input 
                  type="text" 
                  placeholder={property.description_1}
                  value={formData.description_1} 
                  // onChange={(e) => setDescription(e.target.value)}
                  onChange={handleChange}
                /> */}
                  <Form.TextArea
                    placeholder={property.description_1}
                    name="description_1"
                    id=""
                    cols="30"
                    rows="5"
                    value={(property && property.description_1) || formData.description_1}
                    onChange={handleChange}
                  ></Form.TextArea>
                </Form.FormGroup>

                <Form.FormGroup>
                  <Form.TextArea
                    placeholder={property.description_2}
                    name="description_2"
                    id=""
                    cols="30"
                    rows="5"
                    value={(property && property.description_2) || formData.description_2}
                    onChange={handleChange}
                  ></Form.TextArea>
                </Form.FormGroup>

                <Form.FormGroup>
                  <Form.TextArea
                    placeholder={property.description_3}
                    name="description_3"
                    id=""
                    cols="30"
                    rows="5"
                    value={(property && property.description_3) || formData.description_3}
                    onChange={handleChange}
                  ></Form.TextArea>
                </Form.FormGroup>

                <Form.FormGroup>
                  <Form.TextArea
                    placeholder={property.description_4}
                    name="description_4"
                    id=""
                    cols="30"
                    rows="5"
                    value={(property && property.description_4) || formData.description_4}
                    onChange={handleChange}
                  ></Form.TextArea>
                </Form.FormGroup>

                <Form.FormGroup>
                  <Form.TextArea
                    placeholder={property.description_5}
                    name="description_5"
                    id=""
                    cols="30"
                    rows="5"
                    value={(property && property.description_5) || formData.description_5}
                    onChange={handleChange}
                  ></Form.TextArea>
                </Form.FormGroup>

                <Form.FormGroup>
                  <Form.TextArea
                    placeholder={property.description_6}
                    name="description_6"
                    id=""
                    cols="30"
                    rows="5"
                    value={(property && property.description_6) || formData.description_6}
                    onChange={handleChange}
                  ></Form.TextArea>
                </Form.FormGroup>

                <Form.FormGroup>
                  <Form.TextArea
                    placeholder={property.description_7}
                    name="description_7"
                    id=""
                    cols="30"
                    rows="5"
                    value={(property && property.description_7) || formData.description_7}
                    onChange={handleChange}
                  ></Form.TextArea>
                </Form.FormGroup>

                <Form.FormGroup>
                  <Form.SubmitInput
                    type="submit"
                    value="Update Property"
                    onClick={(e) => updateProperty(e)}
                  />
                </Form.FormGroup>
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
