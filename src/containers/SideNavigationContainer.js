import React from "react";
import { SideNavigation } from "../components";
// import links from "../constants/routes/nav-links";
import { useAuth0 } from "@auth0/auth0-react";

const SideNavigationContainer = ({
  sideNavShown,
  setSideNavShown,
  sideNavHidden,
  setSideNavHidden,
}) => {
  const links = [
    {
      name: "Home",
      to: "/",
      class: "fa-fw fa-home"
    },
    {
      name: "Listings",
      to: "/listings",
      class: "fa-fw fa-search"
    },
    // {
    //   name: "Agents",
    //   to: "/agents",
    // },
    // {
    //   name: "login",
    //   to: "/login",
    // },
  ];

  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <SideNavigation shown={sideNavShown} hidden={sideNavHidden}>
      <SideNavigation.Container>
        <SideNavigation.Cross>
          <SideNavigation.Icon
            name="fas fa-times"
            onClick={() => {
              setSideNavHidden(true);
              setSideNavShown(false);
            }}
          />
        </SideNavigation.Cross>
        <SideNavigation.Header>
          <SideNavigation.Title>Real Home</SideNavigation.Title>
          <SideNavigation.Text>The Home You Deserve</SideNavigation.Text>
        </SideNavigation.Header>

        <SideNavigation.Links>
          <SideNavigation.List>
            {links.map((link) => (
              <SideNavigation.ListItem key={link.to}>
                <SideNavigation.Anchor to={link.to}>
                <i class={`fa ${link.class}`}>&nbsp;</i>
                  {link.name}
                </SideNavigation.Anchor>
              </SideNavigation.ListItem>
            ))}
            {/* <SideNavigation.ListItem>
              <SideNavigation.Anchor to="/add-listing">
                Add Listing
              </SideNavigation.Anchor>
            </SideNavigation.ListItem> */}

            {isAuthenticated ? (
              <SideNavigation.ListItem>
                <SideNavigation.Anchor to="/addlisting" special="true">
                <i class="fa fa-solid fa-plus">&nbsp;</i>
                  Add Listing
                </SideNavigation.Anchor>
              </SideNavigation.ListItem>
            ) : null}

            <SideNavigation.ListItem>
              {!isAuthenticated && (
                <SideNavigation.Anchor
                  onClick={() => loginWithRedirect({})}
                  variant="default"
                >
                  <i class="fa fa-fw fa-user">&nbsp;</i>
                  Log in
                </SideNavigation.Anchor>
              )}
              {isAuthenticated && (
                <SideNavigation.Anchor
                  onClick={() => logoutWithRedirect({})}
                  variant="default"
                >
                  Log out
                </SideNavigation.Anchor>
              )}
            </SideNavigation.ListItem>
          </SideNavigation.List>
        </SideNavigation.Links>
      </SideNavigation.Container>
    </SideNavigation>
  );
};

export default SideNavigationContainer;
