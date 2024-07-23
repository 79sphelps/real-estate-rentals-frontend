import React, { useState } from "react";
import ModalImage from "react-modal-image";
import { Property } from "../components";


export const PropertGallery = ({ image }) => {
  return (
    <Property.Gallery>
        {image.map((i, idx) => (
            <Property.ImageContainer key={idx}>
              <ModalImage
                small={i}
                large={i}
                alt="image"
              />
            {/* <Property.Image source={i} /> */}
        </Property.ImageContainer>
        ))}
    </Property.Gallery>
  );
};

export const PropertyFeatures = ({ features }) => {
  const [featuresShown, setContentShown] = useState(false);

  const contentHandler = () => {
    setContentShown((previousState) => !previousState);
  };

  return (
    <Property.Info>
      <Property.InfoHeader onClick={contentHandler}>
        <Property.InfoTitle>Details and Features</Property.InfoTitle>
        <Property.Icon
          name={featuresShown ? "fas fa-chevron-up" : "fas fa-chevron-down"}
          info></Property.Icon>
      </Property.InfoHeader>
      <Property.InfoContent contentShown={featuresShown}>
        <Property.InfoItem>
          <Property.Text>
            <Property.Span>Bedrooms : </Property.Span>
            {features.bedrooms}
          </Property.Text>
          <Property.Text>
            <Property.Span>Garage : </Property.Span>
            {features.garage}
          </Property.Text>
        </Property.InfoItem>

        <Property.InfoItem>
          <Property.Text>
            <Property.Span>Status : </Property.Span>
            {features.status ? "Active" : "Not Active"}
          </Property.Text>
          <Property.Text>
            <Property.Span>Elevator : </Property.Span>
            {features.elevator ? "Yes" : "No"}
          </Property.Text>
        </Property.InfoItem>
        <Property.InfoItem>
          <Property.Text>
            <Property.Span>Kitchen : </Property.Span>
            {features.kitchen ? "Availalbe" : "Not Available"}
          </Property.Text>
        </Property.InfoItem>
      </Property.InfoContent>
    </Property.Info>
  );
};

export const PropertyAmenities = ({ amenities }) => {
  const [amenitiesShown, setContentShown] = useState(false);

  const contentHandler = () => {
    setContentShown((previousState) => !previousState);
  };

  return (
    <Property.Info>
      <Property.InfoHeader onClick={contentHandler}>
        <Property.InfoTitle>Amenities</Property.InfoTitle>
        <Property.Icon
          name={amenitiesShown ? "fas fa-chevron-up" : "fas fa-chevron-down"}
          info></Property.Icon>
      </Property.InfoHeader>
      <Property.InfoContent contentShown={amenitiesShown}>
        {amenities.map((amenity) => (
          <Property.InfoItem key={amenity}>
            <Property.Text>{amenity}</Property.Text>
          </Property.InfoItem>
        ))}
      </Property.InfoContent>
    </Property.Info>
  );
};

export const PropertyAddress = ({ address }) => {
  const [addressShown, setContentShown] = useState(false);

  const contentHandler = () => {
    setContentShown((previousState) => !previousState);
  };
  return (
    <Property.Info>
      <Property.InfoHeader onClick={contentHandler}>
        <Property.InfoTitle>Address</Property.InfoTitle>
        <Property.Icon
          name={addressShown ? "fas fa-chevron-up" : "fas fa-chevron-down"}
          info></Property.Icon>
      </Property.InfoHeader>
      <Property.InfoContent contentShown={addressShown}>
        <Property.InfoItem>
          <Property.Text>
            <Property.Span>Street : </Property.Span>
            {address.street}
          </Property.Text>
          <Property.Text>
            <Property.Span>City : </Property.Span>
            {address.city}
          </Property.Text>
        </Property.InfoItem>
        <Property.InfoItem>
          {/* <Property.Text>
            <Property.Span>County/Sub-County : </Property.Span>
            {address.county}
          </Property.Text> */}
          <Property.Text>
            <Property.Span>State : </Property.Span>
            {address.state}
          </Property.Text>
          {/* <Property.Text>
            <Property.Span>Street : </Property.Span>
            {address.street}
          </Property.Text> */}
          <Property.Text>
            <Property.Span>Zip : </Property.Span>
            {address.zip}
          </Property.Text>
        </Property.InfoItem>
        {/* <Property.InfoItem>
          <Property.Text>
            <Property.Span>Area : </Property.Span>
            {address.area}
          </Property.Text>
        </Property.InfoItem> */}
      </Property.InfoContent>
    </Property.Info>
  );
};

export const PropertyAdditionalDetails = ({ property }) => {
  const [additionalDetailsShown, setContentShown] = useState(false);

  const contentHandler = () => {
    setContentShown((previousState) => !previousState);
  };
  return (
    <Property.Info>
      <Property.InfoHeader onClick={contentHandler}>
        <Property.InfoTitle>Additional Details</Property.InfoTitle>
        <Property.Icon
          name={additionalDetailsShown ? "fas fa-chevron-up" : "fas fa-chevron-down"}
          info></Property.Icon>
      </Property.InfoHeader>
      <Property.InfoContent contentShown={additionalDetailsShown}>
        <Property.InfoItem>
          <Property.Text>
            <Property.Span>Price : </Property.Span>
            {property.price}
          </Property.Text>
          <Property.Text>
            <Property.Span>Beds : </Property.Span>
            {property.beds}
          </Property.Text>
        </Property.InfoItem>
        <Property.InfoItem>
          <Property.Text>
            <Property.Span>Baths : </Property.Span>
            {property.baths}
          </Property.Text>
          <Property.Text>
            <Property.Span>Square Feet : </Property.Span>
            {property.sqft}
          </Property.Text>
        </Property.InfoItem>
        <Property.InfoItem>
          <Property.Text>
            <Property.Span>Type : </Property.Span>
            {property.type}
          </Property.Text>
          <Property.Text>
            <Property.Span>Year Built : </Property.Span>
            {property.year}
          </Property.Text>
        </Property.InfoItem>
        <Property.InfoItem>
          <Property.Text>
            <Property.Span>Heating : </Property.Span>
            {property.heating}
          </Property.Text>
          <Property.Text>
            <Property.Span>Cooling : </Property.Span>
            {property.cooling}
          </Property.Text>
        </Property.InfoItem>
        <Property.InfoItem>
          <Property.Text>
            <Property.Span>HOA : </Property.Span>
            {property.hoa}
          </Property.Text>
          <Property.Text>
            <Property.Span>Parcel Number : </Property.Span>
            {property.parcelNumber}
          </Property.Text>
        </Property.InfoItem>
      </Property.InfoContent>
    </Property.Info>
  );
};

export const PropertyDescription = ({ description }) => {
  const [descriptionShown, setContentShown] = useState(false);

  const contentHandler = () => {
    setContentShown((previousState) => !previousState);
  };
  return (
    <Property.Info>
      <Property.InfoHeader onClick={contentHandler}>
        <Property.InfoTitle>Property Description</Property.InfoTitle>
        <Property.Icon
          name={descriptionShown ? "fas fa-chevron-up" : "fas fa-chevron-down"}
          info></Property.Icon>
      </Property.InfoHeader>
      <Property.InfoContent block="true" contentShown={descriptionShown}>
        <Property.Text>{description}</Property.Text>
      </Property.InfoContent>
    </Property.Info>
  );
};
