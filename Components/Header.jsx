import React from "react";
import Breadcrumb from "./BreadCrumb";

const Header = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          position: "relative",
          height: "100px",
          backgroundColor: "#CE2829",
          padding: "40px 0px 20px 0px",
          alignItems: "center",
        }}
      >
        <h1>Teknolojik Yemekler</h1>
        <div style={{ marginLeft: "-240px" }}>
          <Breadcrumb />
        </div>
      </div>
    </>
  );
};

export default Header;
