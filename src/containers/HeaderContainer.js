import React, { useState, useEffect } from "react";
// import links from "../constants/routes/nav-links";
import { HeaderWrapper, Banner, Jumbotron } from "../components";
import {
  // AdvancedSearchContainer,
  SideNavigationContainer,
} from "./index";
import { useAuth0 } from "@auth0/auth0-react";

const HeaderContainer = ({ bg, source }) => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // const onUpdateActiveLink = (value) => {
  //   setActiveLink(value);
  // };

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
            <HeaderWrapper.Link
              className="animate__animated animate__bounce"
              bg={bg}
              fixed={fixed}
              to="/"
            >
              Tessa Goldy - Real Estate Broker
            </HeaderWrapper.Link>
          </HeaderWrapper.Title>
          <HeaderWrapper.LinksContainer>
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

            {isAuthenticated ? (
              <HeaderWrapper.List>
                <HeaderWrapper.Item>
                  <HeaderWrapper.Anchor to="/addlisting" special="true">
                    Add Listing
                  </HeaderWrapper.Anchor>
                </HeaderWrapper.Item>
              </HeaderWrapper.List>
            ) : null}

            <HeaderWrapper.List>
              <HeaderWrapper.Item>
                {!isAuthenticated && (
                  <HeaderWrapper.Button
                    onClick={() => loginWithRedirect({})}
                    variant="default"
                  >
                    Log in
                  </HeaderWrapper.Button>
                )}
                {isAuthenticated && (
                  <HeaderWrapper.Button
                    onClick={() => logoutWithRedirect({})}
                    variant="default"
                  >
                    Log out
                  </HeaderWrapper.Button>
                )}
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
            <Jumbotron.Title>Find Your Home Here</Jumbotron.Title>
            <Jumbotron.Text>
              Fresh Ideas | Personal Service | Proven Results
            </Jumbotron.Text>
          </Jumbotron.Left>
          {/* <Jumbotron.Right>
            <AdvancedSearchContainer />
          </Jumbotron.Right> */}
        </Jumbotron>
      )}
      <SideNavigationContainer
        sideNavShown={sideNavShown}
        sideNavHidden={sideNavHidden}
        setSideNavHidden={setSideNavHidden}
        setSideNavShown={setSideNavShown}
      />
    </Banner>
  );
};

export default HeaderContainer;
