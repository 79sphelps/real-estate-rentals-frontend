import React from "react";
import loading from "../assets/loading.svg";

const Loading = () => (
  // <div className="spinner" style={{ 
  <div style={{ 
    /* High z-index so it is on top of the page */
    display: "block",
    position: "fixed",
    zIndex: "1031", 
    top: "50%",
    right: "50%", /* or: left: 50%; */
    marginTop: "-..px", /* half of the elements height */
    marginRight: "-..px" /* half of the elements width */
    }}>
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;