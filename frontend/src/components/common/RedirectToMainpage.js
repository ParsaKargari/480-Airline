import React, { useEffect } from "react";

const RedirectToMainPage = () => {
  useEffect(() => {
    // Redirect to the main page only if the current location is not the main page
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }
  }, []); 

  return null; 
};

export default RedirectToMainPage;
