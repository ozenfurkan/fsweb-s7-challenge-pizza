import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const Breadcrumb = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        Anasayfa
      </Link>
      <Link underline="hover" color="inherit" href="/">
        Seçenekler
      </Link>
      <Link underline="hover" color="inherit" href="/create-order">
        Sipariş Oluştur
      </Link>
    </Breadcrumbs>
  );
};

export default Breadcrumb;
