import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Home,
  Listings,
  Listing,
  AddListing,
  DeleteListing,
  Dashboard,
  Messages,
  CallbackPage
} from "./pages";
import Loading from "./components/loading";

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
      <Route exact path="/" element={<Home />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/messages" element={<Messages />} />
      <Route exact path="/listings" element={<Listings />} />
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
      <Route path="/callback" element={<CallbackPage />} />
    </Routes>
  );
};

export default App;
