import React, { useEffect } from "react";

const RedirectToMainPage = () => {
  useEffect(() => {
    // Redirect to the main page only if the current location is not the main page
    if (window.location.pathname !== "/") {
      window.location.href = "/"; // Replace "/" with your main page URL
    }
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  return null; // This component doesn't render anything
};

export default RedirectToMainPage;
