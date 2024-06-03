import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Section, Form } from "../components";
import { createGeneralMessage } from "../redux/actions";

const HomeContactContainer = () => {
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
    <Section bgColor="--bs-fade-blue">
      <Section.InnerContainer>
        <Section.Header></Section.Header>
        <Section.Content>
          <Section.Flex>
            <Section.FlexItem width="70%">
              <Section.SubTitle size="1">Contact Us</Section.SubTitle>
              <Section.Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non,
                nemo dolorem amet cupiditate sequi cum?
              </Section.Text>
              <Section.Flex>
                <Section.FlexItem width="50%">
                  <Section.SubTitle>We Will Get In Touch</Section.SubTitle>
                  <Section.Text>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Non,
                  </Section.Text>
                </Section.FlexItem>
                <Section.FlexItem width="50%">
                  <Section.SubTitle>
                    Get Instant Support From Us
                  </Section.SubTitle>
                  <Section.Text>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Non,
                  </Section.Text>
                </Section.FlexItem>
              </Section.Flex>
            </Section.FlexItem>
            <Section.FlexItem width="30%" bg="true">
              {!submitted ? (
                //   <form onSubmit={saveGeneralMessage}>
                //   <input
                //     type="text"
                //     value={name}
                //     onChange={(e) => setName(e.target.value)}
                //   />
                //   <input
                //     type="text"
                //     value={email}
                //     onChange={(e) => setEmail(e.target.value)}
                //   />
                //   <input
                //     type="text"
                //     value={phone}
                //     onChange={(e) => setPhone(e.target.value)}
                //   />
                //   <input
                //     type="text"
                //     value={message}
                //     onChange={(e) => setMessage(e.target.value)}
                //   />
                //   <button type="submit">Submit</button>
                // </form>

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
                  <Section.FlexItem width="50%">
                    <Section.SubTitle>We Will Get In Touch</Section.SubTitle>
                    <Section.Text>
                      Thank you for submitting your contact message.
                    </Section.Text>
                  </Section.FlexItem>
                  {/* <Section.FlexItem width="50%">
                  <Section.SubTitle>
                    Get Instant Support From Us
                  </Section.SubTitle>
                  <Section.Text>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Non,
                  </Section.Text>
                </Section.FlexItem> */}
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
