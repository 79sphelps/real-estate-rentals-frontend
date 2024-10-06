import React, { Suspense, lazy } from 'react';
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { CallbackPage } from "./pages/callback-page";
import Loading from "./components/loading";

const Home = lazy(() => import("./pages/home"));
const Listings = lazy(() => import("./pages/listings"));
const Listing = lazy(() => import("./pages/property"));
const AddListing = lazy(() => import("./pages/add-listing"));
const DeleteListing = lazy(() => import("./pages/delete-listing"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Messages = lazy(() => import("./pages/messages"));

const App = () => {
  const { isLoading, error, isAuthenticated } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
};

export default App;
