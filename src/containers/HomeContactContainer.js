import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Section, Form } from "../components";
import { createGeneralMessage } from "../redux/actions";
import {
  FormError,
  getContactFormErrorObject,
  contactFormErrors,
} from "../helpers/form_validation";

const HomeContactContainer = () => {
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
  // const [submitted, setSubmitted] = useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  // const [submitted, setSubmitted] = useState(false);
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
        .map((v) => {
          if (v) return true;
        })
        .includes(true) ||
      Object.values(formDetails)
        .map((v) => {
          if (v === "") return true;
        })
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
    <Section bgColor="--bs-fade-blue">
      <Section.InnerContainer>
        <Section.Header></Section.Header>
        <Section.Content>
          <Section.Flex>
            <Section.FlexItem width="70%">
              <Section.SubTitle size="1">Contact Us</Section.SubTitle>
              <Section.Text>
                With her experience and position as a local broker in
                conjunction with an extensive marketing background, Tessa has
                significant advantages she can use to sell your house.
                <br /> <br />
                Seasoned sales, marketing and analytical skills established by
                10 years of corporate and agency experience. She has an
                extensive network of brokers as well as local buyers and sellers
                to prospect on your behalf.
                <br /> <br />
                She specializes in all residential areas all across the state,
                doing business in the Greater Portland area, the Oregon Coast,
                Bend to Medford.
              </Section.Text>
              <Section.Flex>
                <Section.FlexItem width="50%">
                  <Section.SubTitle>Meet Tessa</Section.SubTitle>
                  <Section.Text>
                    Tessa Gold takes a concierge approach to real estate. She
                    comes from a background in medical legal work where she
                    brokered physicians for personal injury and medical
                    malpractice cases. Tessa is entrepreneurial and
                    business-minded which lends itself well to real estate. She
                    provides expert analysis and exclusive insights as well as
                    cutting edge strategies based on her local market knowledge.
                    <br /> <br />
                    When you decide to work with Tessa, you get Tessa. She
                    prides herself on being the agent that is front and center
                    every step of the way for her clients. She is an active
                    listener, always anticipating the needs of her clients. She
                    does her homework and stays up-to-date on the latest housing
                    updates. When it comes to a transaction she attends to every
                    detail from start to finish.
                  </Section.Text>
                </Section.FlexItem>
                <Section.FlexItem width="50%">
                  <Section.SubTitle>
                    Get Instant Support From Us
                  </Section.SubTitle>
                  <Section.Text>
                    Moving and purchasing a home is a big transaction. Tessa
                    works with everyone from relocating clients to locals and
                    understands that moving into a new home or community, or
                    even a new state, is a big transition. She currently
                    specializes in the Lake Oswego, West Linn, Dunthorpe,
                    southwest Portland, Wilsonville, Tigard and Tualatin areas.
                    It’s her top priority to help her clients become acquainted
                    with local resources, schools and neighbors around them.
                    <br /> <br />
                    Whether it’s a luxury listing or a single family
                    residential, Tessa always brings in her full arsenal of
                    marketing strategies and customizes every listing’s
                    marketing plan. Finding that right fit is extremely
                    important to her because meeting and exceeding her client’s
                    goals is always her main objective.
                  </Section.Text>
                </Section.FlexItem>
              </Section.Flex>
            </Section.FlexItem>
            <Section.FlexItem width="30%" bg="true">
              {!submitted ? (
                <Form data-testid="contactForm">
                  <Form.FormGroup>
                    <Form.Input
                      name="Your Name"
                      data-testid="name"
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
                      name="Your Email"
                      data-testid="email"
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
                      name="Your Phone Number"
                      data-testid="phone"
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
                      data-testid="message"
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      // value={message}
                      alue={formDetails.message}
                      // onChange={(e) => setMessage(e.target.value)}
                      onChange={(e) => onFormUpdate("message", e.target.value)}
                    ></Form.TextArea>
                    {formDetails.message.length < 25 && (
                      <div>
                        ({25 - formDetails.message.length} characters still
                        needed)
                      </div>
                    )}
                    {formErrorObject.messageError && (
                      <FormError msg={contactFormErrors["message"].error} />
                    )}
                  </Form.FormGroup>
                  <Form.FormGroup>
                    <Form.SubmitInput
                      data-testid="submit"
                      type="submit"
                      value="Send Message"
                      disabled={buttonText === "Sending..."  || doesFormHaveErrors()}
                      style={{
                        color: doesFormHaveErrors() && "lightgrey",
                        cursor: doesFormHaveErrors() && "not-allowed",
                        marginRight: "20px"
                      }}
                      onClick={(e) => saveGeneralMessage(e)}
                    />
                  </Form.FormGroup>
                </Form>
              ) : (
                <Section.Flex style={{ background: "white", padding: "20px" }}>
                  <Section.FlexItem width="100%">
                    <Section.SubTitle>We Will Get In Touch!</Section.SubTitle>
                    <Section.Text>
                      Thank you for submitting your contact message.
                    </Section.Text>
                  </Section.FlexItem>
                </Section.Flex>
              )}
            </Section.FlexItem>
          </Section.Flex>
        </Section.Content>
      </Section.InnerContainer>
    </Section>
  );
};

export default HomeContactContainer;
