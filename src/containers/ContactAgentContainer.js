import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Property, Form, Section } from "../components";
import { createGeneralMessage } from "../redux/actions";

const ContactAgentContainer = ({ property }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  }, []);

  const saveGeneralMessage = (e) => {
    e.preventDefault();
    var data = {
      name: name,
      email: email,
      phone: phone,
      message: message,
    };
    dispatch(createGeneralMessage(data));
    setSubmitted(true);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.FormGroup>
              <Form.FormGroup>
                <Form.Input
                  type="text"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.FormGroup>
              <Form.FormGroup>
                <Form.Input
                  type="text"
                  placeholder="Your Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.FormGroup>
              <Form.FormGroup>
                <Form.TextArea
                  placeholder="Your Message"
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></Form.TextArea>
              </Form.FormGroup>
              <Form.FormGroup>
                <Form.SubmitInput
                  type="submit"
                  value="Send Message"
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
