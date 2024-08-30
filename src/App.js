import { Route, Routes } from "react-router-dom";
import {
  Home,
  // Agents,
  Listings,
  // Login,
  // Signup,
  // Forgot,
  // Agentt,
  Listing,
  AddListing,
  DeleteListing,
  Dashboard,
  // UserProfile,
  Messages,
  // Password,
  // AddLisiting,
  // AdminListingList,
  // AdminAgentsList,
  // AgentListing,
} from "./pages";
import { CallbackPage } from "./pages/callback-page";
import Loading from "./components/loading";
// import { Profile } from './components/profile';
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { isLoading, error, isAuthenticated } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Routes>
      {/* <Route exact path="/" component={isAuthenticated ? CallbackPage : Home} /> */}
      <Route exact path="/" element={<Home />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/messages" element={<Messages />} />
      <Route exact path="/listings" element={<Listings />} />
      {/* <Route exact path="/listing" component={ isAuthenticated ? Listings : Home} />  */}
      <Route
        exact
        path="/addlisting"
        element={isAuthenticated ? <AddListing /> : <Home />}
      />
      <Route exact path="/rentals/:id" element={<Listing />} />
      <Route
        exact
        path="/rentals/delete/:id"
        element={isAuthenticated ? <DeleteListing /> : <Home />}
      />
      {/* <Route exact path="/login" component={Login} /> */}
      {/* <Route exact path="/signup" component={Signup} /> */}
      {/* <Route exact path="/forgot-password" component={Forgot} /> */}
      {/* <Route exact path="/profile" component={UserProfile} /> */}
      {/* <Route exact path="/change-password" component={Password} /> */}
      {/* <Route path="/add-listing/:id?" component={AddLisiting} /> */}
      {/* <Route exact path="/all-listing" component={AdminListingList} /> */}
      {/* <Route exact path="/all-agents" component={AdminAgentsList} /> */}
      {/* <Route exact path="/mylisting" component={AgentListing} /> */}
      <Route path="/callback" element={<CallbackPage />} />
    </Routes>
  );
};

export default App;
