import React, { useEffect, useState } from "react";
import { Inbox, Form } from "../components";
import { useSelector, useDispatch } from "react-redux";
// import { getMessages, deleteMessage } from "../redux/actions/messagesAction";
import { getMessages, deleteMessage } from "../redux/actions";
import { selectGeneralMessages } from "../redux/selectors";

const MessagesContainer = () => {
  const dispatch = useDispatch();

  // const { messages } = useSelector((state) => state.messageList);
  const messages = useSelector(selectGeneralMessages);

  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);
  return (
    <Inbox>
      {messages.map((message) => (
        <InboxItem key={message.id} message={message} />
        // <InboxItem key={message.id + "-" + Math.random()} message={message} />
      ))}
    </Inbox>
  );
};

const InboxItem = ({ message }) => {
  const [bodyShown, setBodyShown] = useState(false);

  const dispatch = useDispatch();

  const [replyShown, setReplyShown] = useState(false);

  const handleBodyShown = () => setBodyShown((prevState) => !prevState);

  const handleReplyShown = () => setReplyShown(true);

  const handleReplyHide = () => setReplyShown(false);

  const handleMessageDelete = (id) => {
    setBodyShown(false);
    dispatch(deleteMessage(id));
  };

  return (
    <Inbox.Item>
      <Inbox.ItemHeader>
        {/* <Inbox.Text onClick={handleBodyShown}>{message.from}</Inbox.Text> */}
        <div style={{ width: "100px" }}>
        <Inbox.Text onClick={handleBodyShown}>{message.name}</Inbox.Text>
        </div>
        {/* <Inbox.Text onClick={handleBodyShown}>{message.title}</Inbox.Text> */}
        <Inbox.Text onClick={handleBodyShown}>New Message</Inbox.Text>
        <Inbox.HeaderAction>
          <Inbox.Icon
            onClick={() => handleMessageDelete(message._id)}
            name="fas fa-trash"
          />
          <Inbox.Icon
            onClick={handleBodyShown}
            name={bodyShown ? "fas fa-envelope" : "fas fa-envelope-open"}
            role="open-close"
          />
          {/* <Inbox.Span>Feb 19</Inbox.Span> */}
          <Inbox.Span>{ (new Date(message.createdAt)).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }</Inbox.Span>
        </Inbox.HeaderAction>
      </Inbox.ItemHeader>
      {bodyShown && (
        <Inbox.ItemBody>
          <Inbox.BodyContainer>
            <Inbox.BodyTitle>
              {/* <Inbox.Title>{message.title}</Inbox.Title> */}
              <Inbox.Title>Message Title</Inbox.Title>
              <Inbox.Text>
                {/* <Inbox.Span special="true">{message.from.charAt(0)}</Inbox.Span> */}
                <Inbox.Span special="true">{message.name.charAt(0)}</Inbox.Span>

                {/* <Inbox.Span>{message.from}</Inbox.Span> */}
                <Inbox.Span>{message.email}</Inbox.Span>
                {" ,"}
                <Inbox.Span>
                  {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. */}
                  { message.phone }
                </Inbox.Span>
              </Inbox.Text>
            </Inbox.BodyTitle>
            <Inbox.BodyContent>
              {/* <Inbox.Text>{message.body}</Inbox.Text> */}
              <Inbox.Text>{message.message}</Inbox.Text>
            </Inbox.BodyContent>
            <Inbox.BodyFooter>
              <Inbox.FooterTitle>
                <Inbox.Button
                  role="reply"
                  onClick={() => handleReplyShown(message._id)}>
                  <Inbox.Icon name="fas fa-reply " />
                  Reply
                </Inbox.Button>
                <Inbox.Button
                  role="delete"
                  onClick={() => handleMessageDelete(message._id)}>
                  <Inbox.Icon name="fas fa-trash" />
                  Delete
                </Inbox.Button>
              </Inbox.FooterTitle>
              {replyShown && (
                <Inbox.FooterContent>
                  <Form>
                    <Form.FormGroup>
                      <Form.Label>Reply to</Form.Label>
                      <Form.Input value={message.emailFrom} />
                    </Form.FormGroup>
                    <Form.FormGroup>
                      <Form.Input placeholder="Reply title" />
                    </Form.FormGroup>
                    <Form.FormGroup>
                      <Form.TextArea
                        placeholder="Reply message"
                        name=""
                        id=""
                        cols="30"
                        rows="10"></Form.TextArea>
                    </Form.FormGroup>
                    <Inbox.Flex>
                      <Form.FormGroup>
                        <Form.SubmitInput value="Send Reply" />
                        <Inbox.Button role="cancel" onClick={handleReplyHide}>
                          Cancel
                        </Inbox.Button>
                      </Form.FormGroup>
                    </Inbox.Flex>
                  </Form>
                </Inbox.FooterContent>
              )}
            </Inbox.BodyFooter>
          </Inbox.BodyContainer>
        </Inbox.ItemBody>
      )}
    </Inbox.Item>
  );
};

export default MessagesContainer;
