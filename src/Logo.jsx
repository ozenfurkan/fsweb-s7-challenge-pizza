import React from "react";
import logoImg from "../Assets/mile1-assets/logo.svg";

const Logo = () => {
  return (
    <body className="logo-body">
      <img src={logoImg} alt="logoImg" className="logo" />
    </body>
  );
};

export default Logo;
