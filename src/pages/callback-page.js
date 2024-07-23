import React from "react";
import { 
  useAuth0, 
  // withAuthenticationRequired 
} from "@auth0/auth0-react";
import { Section } from "../components";
import {
  HeaderContainer,
  // HomeContactContainer,
  FooterContainer,
} from "../containers";
// import { NavBar } from "../components/navigation/desktop/nav-bar";
// import { MobileNavBar } from "../components/navigation/mobile/mobile-nav-bar";

export const CallbackPage = () => {
  const { user } = useAuth0();

  return (
    // <div className="page-layout">
    //   {/* <NavBar />
    //   <MobileNavBar /> */}
    //   { user.name }<br>
    //   { user.email }</br>
    //   <div className="page-layout__content" />
    // </div>

    <div>
      {user && user.name !== null && user.name !== "" && user.email ? (
        <Section bgColor="--bs-fade-blue">
          <HeaderContainer bg="true" source="/images/banners/banner4.jpg" />
          <Section.InnerContainer>
            <Section.Header></Section.Header>
            <Section.Content>
              <Section.Flex>
                <Section.FlexItem width="70%">
                  <Section.SubTitle size="1">Signed in as {user.name}</Section.SubTitle>
                  <Section.Text>Email: {user.email}</Section.Text>
                </Section.FlexItem>
              </Section.Flex>
            </Section.Content>
          </Section.InnerContainer>
          <FooterContainer />
        </Section>
      ) : null}
    </div>
  );
};

// export default withAuthenticationRequired(CallbackPage, {
//     onRedirecting: () => <Loading />,
//   });
