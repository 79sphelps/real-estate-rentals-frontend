import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Property, Form, Section } from "../components";
import { createGeneralMessage } from "../redux/actions";
import {
  FormError,
  getContactFormErrorObject,
  contactFormErrors,
} from "../helpers/form_validation";

const ContactAgentContainer = ({ property }) => {
  const dispatch = useDispatch();

  const formInitialDetails = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [buttonText, setButtonText] = useState("Send");

  useEffect(() => {
    setSubmitted(false);
    // setName("");
    // setEmail("");
    // setPhone("");
    // setMessage("");
  }, []);

  const saveGeneralMessage = (e) => {
    e.preventDefault();
    // var data = {
    //   name: name,
    //   email: email,
    //   phone: phone,
    //   message: message,
    // };
    setButtonText("Sending...");
    // dispatch(createGeneralMessage(data));
    dispatch(createGeneralMessage(formDetails));
    setSubmitted(true);
    // setName("");
    // setEmail("");
    // setPhone("");
    // setMessage("");
    setTimeout(() => {
      setButtonText("Send");
      setFormDetails(formInitialDetails);
      setSubmitted(false);
    }, 5000);
  };

  let initialFormErrorObject = {
    nameError: false,
    emailError: false,
    phoneError: false,
    messageError: false,
  };

  const [formErrorObject, setFormErrorObject] = useState(
    initialFormErrorObject
  );

  const doesFormHaveErrors = () => {
    return (
      Object.values(formErrorObject)
        .map((v) => (v ? true : false))
        .includes(true) ||
      Object.values(formDetails)
        .map((v) => (!v ? true : false))
        .includes(true)
    );
  };

  const onFormUpdate = (category, value) => {
    let obj = getContactFormErrorObject(category, value, formErrorObject);
    let newObj = { ...formErrorObject, ...obj };
    setFormErrorObject({ ...formErrorObject, ...newObj });
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  return (
    <Property.Contact>
      <Property.ContactHeader>
        <Property.ContactItem>
          <Property.AgentImage
            // source={
            //   property.agent.image ? property.agent.image : property.agent.photo
            // }
            // https://www.pravatar.cc/
            // source="https://i.pravatar.cc/150?img=51"
            source="https://assets.jlscloud.net/account/tessagold.png"
          />
        </Property.ContactItem>
        <Property.ContactItem>
          {/* <Property.Subtitle>{property.agent.name}</Property.Subtitle> */}
          <Property.Subtitle>Tessa Goldy</Property.Subtitle>
          <Property.ContactList>
            <Property.ListItem>
              <Property.Icon name="fas fa-phone-alt"></Property.Icon>
              <Property.Text>+254720843306</Property.Text>
            </Property.ListItem>
          </Property.ContactList>
        </Property.ContactItem>
      </Property.ContactHeader>
      <Property.ContactContent>
        <Property.ContactContainer>
          {!submitted ? (
            <Form>
              <Form.FormGroup>
                <Form.Input
                  type="text"
                  placeholder="Your Name"
                  // value={name}
                  value={formDetails.name}
                  // onChange={(e) => setName(e.target.value)}
                  onChange={(e) => onFormUpdate("name", e.target.value)}
                />
                {formErrorObject.nameError && (
                  <FormError msg={contactFormErrors["name"].error} />
                )}
              </Form.FormGroup>
              <Form.FormGroup>
                <Form.Input
                  type="text"
                  placeholder="Your Email"
                  // value={email}
                  value={formDetails.email}
                  // onChange={(e) => setEmail(e.target.value)}
                  onChange={(e) => onFormUpdate("email", e.target.value)}
                />
                {formErrorObject.emailError && (
                  <FormError msg={contactFormErrors["email"].error} />
                )}
              </Form.FormGroup>
              <Form.FormGroup>
                <Form.Input
                  type="text"
                  placeholder="Your Phone Number"
                  // value={phone}
                  value={formDetails.phone}
                  // onChange={(e) => setPhone(e.target.value)}
                  onChange={(e) => onFormUpdate("phone", e.target.value)}
                />
                {formErrorObject.phoneError && (
                  <FormError msg={contactFormErrors["phone"].error} />
                )}
              </Form.FormGroup>
              <Form.FormGroup>
                <Form.TextArea
                  placeholder="Your Message"
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  // value={message}
                  value={formDetails.message}
                  // onChange={(e) => setMessage(e.target.value)}
                  onChange={(e) => onFormUpdate("message", e.target.value)}
                ></Form.TextArea>
                {formDetails.message.length < 25 && (
                  <div>
                    ({25 - formDetails.message.length} characters still needed)
                  </div>
                )}
                {formErrorObject.messageError && (
                  <FormError msg={contactFormErrors["message"].error} />
                )}
              </Form.FormGroup>
              <Form.FormGroup>
                <Form.SubmitInput
                  type="submit"
                  value="Send Message"
                  disabled={buttonText === "Sending..." || doesFormHaveErrors()}
                  style={{
                    color: doesFormHaveErrors() && "lightgrey",
                    cursor: doesFormHaveErrors() && "not-allowed",
                    marginRight: "20px",
                  }}
                  onClick={(e) => saveGeneralMessage(e)}
                />
              </Form.FormGroup>
            </Form>
          ) : (
            <Section.Flex>
              {/* <Section.FlexItem width="50%"> */}
              <Section.FlexItem width="100%">
                <Section.SubTitle>
                  Thank you for submitting your contact message.
                </Section.SubTitle>
                <Section.Text>I will get in touch shortly.</Section.Text>
              </Section.FlexItem>
            </Section.Flex>
          )}
        </Property.ContactContainer>
      </Property.ContactContent>
    </Property.Contact>
  );
};

export default ContactAgentContainer;
