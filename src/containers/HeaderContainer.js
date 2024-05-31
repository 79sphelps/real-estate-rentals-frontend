import React, { useState, useEffect } from "react";
// import links from "../constants/routes/nav-links";
import { HeaderWrapper, Banner, Jumbotron } from "../components";
// import { 
//   AdvancedSearchContainer, 
//   SideNavigationContainer 
// } from "./index";
import { useAuth0 } from "@auth0/auth0-react";

const HeaderContainer = ({ bg, source }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  const [sideNavShown, setSideNavShown] = useState(false);
  const [sideNavHidden, setSideNavHidden] = useState(true);
  // const [fixed, setFixed] = useState(false);
  let fixed = false;

  const changeBackgroundColorAndPosition = () => {
    if (window.pageYOffset > 100) {
      // setFixed(true);
      fixed = true;
    } else {
      // setFixed(false);
      fixed = false;
    }
  };

  window.addEventListener("scroll", changeBackgroundColorAndPosition);

  const handleSideNavigation = () => {
    setSideNavHidden((prevState) => !prevState);
    setSideNavShown((prevState) => !prevState);
  };

  return (
    <Banner bg={bg} source={source}>
      <HeaderWrapper bg={bg} fixed={fixed}>
        <HeaderWrapper.Container>
          <HeaderWrapper.Title bg={bg}>
            <HeaderWrapper.Link bg={bg} fixed={fixed} to="/">
              Real Home
            </HeaderWrapper.Link>
          </HeaderWrapper.Title>
          <HeaderWrapper.LinksContainer>
            {/* <HeaderWrapper.List links="links">
              {links.map((link) => (
                <HeaderWrapper.Item key={link.to}>
                  <HeaderWrapper.Anchor bg={bg} fixed={fixed} to={`${link.to}`}>
                    {link.name}
                  </HeaderWrapper.Anchor>
                </HeaderWrapper.Item>
              ))}
            </HeaderWrapper.List> */}
            {/* <HeaderWrapper.List>
              <HeaderWrapper.Item>
                <HeaderWrapper.Anchor to="/add-listing" special="true">
                  Add Listing
                </HeaderWrapper.Anchor>
              </HeaderWrapper.Item>
            </HeaderWrapper.List> */}

            <HeaderWrapper.List>
              <HeaderWrapper.Item>
                <HeaderWrapper.Anchor to="/" special="true">
                  Home
                </HeaderWrapper.Anchor>
              </HeaderWrapper.Item>
            </HeaderWrapper.List>

            <HeaderWrapper.List>
              <HeaderWrapper.Item>
                <HeaderWrapper.Anchor to="/listings" special="true">
                  Listings
                </HeaderWrapper.Anchor>
              </HeaderWrapper.Item>
            </HeaderWrapper.List>

            { isAuthenticated ? ( 
            <HeaderWrapper.List>
              <HeaderWrapper.Item>
                <HeaderWrapper.Anchor to="/addlisting" special="true">
                  Add Listing
                </HeaderWrapper.Anchor>
              </HeaderWrapper.Item>
            </HeaderWrapper.List> ) : null }

            <HeaderWrapper.List>
              <HeaderWrapper.Item>
                {/* <HeaderWrapper.Anchor to="/login" special="true"> */}
                  {/* Login */}
                  {!isAuthenticated && <HeaderWrapper.Button onClick={() => loginWithRedirect({})} variant="default">Log in</HeaderWrapper.Button>}
                  {isAuthenticated && <HeaderWrapper.Button onClick={() => logoutWithRedirect({})} variant="default">Log out</HeaderWrapper.Button>}
                  {/* {isAuthenticated && <UserMenu/> } */}
                  {/* {isAuthenticated && <Home/> }  */}
                {/* </HeaderWrapper.Anchor> */}
              </HeaderWrapper.Item>
            </HeaderWrapper.List>

            <HeaderWrapper.List side="side">
              <HeaderWrapper.Item>
                <HeaderWrapper.Button onClick={handleSideNavigation}>
                  <HeaderWrapper.Icon name="fa fa-bars" />
                </HeaderWrapper.Button>
              </HeaderWrapper.Item>
            </HeaderWrapper.List>
          </HeaderWrapper.LinksContainer>
        </HeaderWrapper.Container>
      </HeaderWrapper>
      {bg === "true" && (
        <Jumbotron>
          <Jumbotron.Left>
            <Jumbotron.Title>Find The Home You Deserve With Us</Jumbotron.Title>
            <Jumbotron.Text>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat,
              exercitationem.
            </Jumbotron.Text>
          </Jumbotron.Left>
          <Jumbotron.Right>
            {/* <AdvancedSearchContainer /> */}
          </Jumbotron.Right>
        </Jumbotron>
      )}
      {/* <SideNavigationContainer
        sideNavShown={sideNavShown}
        sideNavHidden={sideNavHidden}
        setSideNavHidden={setSideNavHidden}
        setSideNavShown={setSideNavShown}
      /> */}
    </Banner>
  );
};

export default HeaderContainer;
