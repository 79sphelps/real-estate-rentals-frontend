import React from "react";
import loading from "../assets/loading.svg";

const Loading = () => (
  // <div style={{ 
  //   /* High z-index so it is on top of the page */
  //   display: "block",
  //   position: "fixed",
  //   zIndex: "1031", 
  //   top: "50%",
  //   right: "45%",
  //   marginTop: "-..px", /* half of the elements height */
  //   marginRight: "-..px", /* half of the elements width */
  //   }}>
    <img 
    src={loading} 
    alt="Loading" 
    style={{ 
      position: "fixed",
      zIndex: "1031",
      top: "0px",
      left: "0px",
      height: "25%",
      width: "25%",
      transform: "translate(150%, 150%)"
    }}
    />
  // </div>
);

export default Loading;