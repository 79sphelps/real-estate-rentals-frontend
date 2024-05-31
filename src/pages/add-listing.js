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
import { Image } from "../components/property/styles/property.js"

const AddListing = () => {

  const dispatch = useDispatch();
//   const property = useSelector(selectCurrentRental);
  // const [submitted, setSubmitted] = useState(false);
  const { isAuthenticated } = useAuth0();
//   const { id } = useParams();

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

//   useEffect(() => {
//     dispatch(getRental(id));
//   }, [dispatch, id]);

  const createProperty = (e) => {
    e.preventDefault();

    console.log('--- creatProperty ---')
    console.log(formData)

    let tImages = []
    Object.entries(formData).forEach(([key, value]) => {
        if (key.includes('image_')) {
          let idx = key.split("_").pop();
          formData[key] = value 
          tImages.push(value)
        } else {
          formData[key] = value
        }
    })

    var data = {
    //   id: id,
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

    dispatch(addRental(data));
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
          <Section bgColor="--bs-fade-info">
            <Section.InnerContainer>

              <Form>

              <Form.FormGroup>
                <Form.Input
                  type="text"
                  placeholder="image_1"
                  name="image_1"
                  value={formData.image_1}
                  onChange={handleChange}
                />
                 <Image src={formData.image_1} height="100" />
              </Form.FormGroup>

              <Form.FormGroup>
                <Form.Input
                  type="text"
                  placeholder="image_2"
                  name="image_2"
                  value={formData.image_2}
                  onChange={handleChange}
                />
                 <Image src={formData.image_2} height="100" />
              </Form.FormGroup>

              <Form.FormGroup>
                <Form.Input
                  type="text"
                  placeholder="image_3"
                  name="image_3"
                  value={formData.image_3}
                  onChange={handleChange}
                />
                 <Image src={formData.image_3} height="100" />
              </Form.FormGroup>

              <Form.FormGroup>
                <Form.Input
                  type="text"
                  placeholder="image_4"
                  name="image_4"
                  value={formData.image_4}
                  onChange={handleChange}
                />
                 <Image src={formData.image_4} height="100" />
              </Form.FormGroup>

              <Form.FormGroup>
                <Form.Input
                  type="text"
                  placeholder="image_5"
                  name="image_5"
                  value={formData.image_5}
                  onChange={handleChange}
                />
                 <Image src={formData.image_5} height="100" />
              </Form.FormGroup>

              <Form.FormGroup>
                <Form.Input
                  type="text"
                  placeholder="image_6"
                  name="image_6"
                  value={formData.image_6}
                  onChange={handleChange}
                />
                 <Image src={formData.image_6} height="100" />
              </Form.FormGroup>

              <Form.FormGroup>
                <Form.Input
                  type="text"
                  placeholder="image_7"
                  name="image_7"
                  value={formData.image_7}
                  onChange={handleChange}
                />
                 <Image src={formData.image_7} height="100" />
              </Form.FormGroup>

              <Form.FormGroup>
                <Form.Input
                  type="text"
                  placeholder="image_8"
                  name="image_8"
                  value={formData.image_8}
                  onChange={handleChange}
                />
                 <Image src={formData.image_8} height="100" />
              </Form.FormGroup>

                <Form.FormGroup>
                  <Form.Input
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
                    type="text"
                    placeholder="city"
                    name="city"
                    value={formData.city}
                    // onChange={(e) => setCity(e.target.value)}
                    onChange={handleChange}
                  />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Input
                    type="text"
                    placeholder="state"
                    name="state"
                    value={formData.state}
                    // onChange={(e) => setState(e.target.value)}
                    onChange={handleChange}
                  />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Input
                    type="text"
                    placeholder="zip"
                    name="zip"
                    // value={formData && formData.zip ? formData.zip : ''}
                    value={formData.zip}
                    // onChange={(e) => setZip(e.target.value)}
                    onChange={handleChange}
                  />
                </Form.FormGroup>

                <Form.FormGroup>
                  <Form.TextArea
                    placeholder="description 1"
                    name="description_1"
                    id=""
                    cols="30"
                    rows="5"
                    value={formData.description_1}
                    onChange={handleChange}
                  ></Form.TextArea>
                </Form.FormGroup>

                <Form.FormGroup>
                  <Form.TextArea
                    placeholder="description 2"
                    name="description_2"
                    id=""
                    cols="30"
                    rows="5"
                    value={formData.description_2}
                    onChange={handleChange}
                  ></Form.TextArea>
                </Form.FormGroup>

                <Form.FormGroup>
                  <Form.TextArea
                    placeholder="description 3"
                    name="description_3"
                    id=""
                    cols="30"
                    rows="5"
                    value={formData.description_3}
                    onChange={handleChange}
                  ></Form.TextArea>
                </Form.FormGroup>

                <Form.FormGroup>
                  <Form.TextArea
                    placeholder="description 4"
                    name="description_4"
                    id=""
                    cols="30"
                    rows="5"
                    value={formData.description_4}
                    onChange={handleChange}
                  ></Form.TextArea>
                </Form.FormGroup>

                <Form.FormGroup>
                  <Form.TextArea
                    placeholder="description 5"
                    name="description_5"
                    id=""
                    cols="30"
                    rows="5"
                    value={formData.description_5}
                    onChange={handleChange}
                  ></Form.TextArea>
                </Form.FormGroup>

                <Form.FormGroup>
                  <Form.TextArea
                    placeholder="description 6"
                    name="description_6"
                    id=""
                    cols="30"
                    rows="5"
                    value={formData.description_6}
                    onChange={handleChange}
                  ></Form.TextArea>
                </Form.FormGroup>

                <Form.FormGroup>
                  <Form.TextArea
                    placeholder="description 7"
                    name="description_7"
                    id=""
                    cols="30"
                    rows="5"
                    value={formData.description_7}
                    onChange={handleChange}
                  ></Form.TextArea>
                </Form.FormGroup>

                <Form.FormGroup>
                  <Form.SubmitInput
                    type="submit"
                    value="Add Rental Property"
                    onClick={(e) => createProperty(e)}
                  />
                </Form.FormGroup>
              </Form>
            </Section.InnerContainer>
          </Section>
      <FooterContainer />
    </>
  );
};

export default AddListing;
