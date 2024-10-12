import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import React from "react";
import { Typography } from "@mui/material";
import homeBanner from "../../Assets/mile1-assets/home-banner.png"; // homeBanner değişkenine atama
import "./home.css";
import { Helmet } from "react-helmet";
import Container from "@mui/material/Container";

const theme = createTheme({
  typography: {
    fontFamily: ["Roboto Condensed", "sans-serif"].join(","),
  },
});

const Home = () => {
  const navigate = useNavigate();

  const hungryButtonClick = () => {
    navigate("/create-order");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <div className="text-content">
          <h2>KOD ACIKTIRIR</h2>
          <h2>PIZZA DOYURUR</h2>
        </div>
      </Container>
      <div className="container">
        <img src={homeBanner} alt="home-banner" className="home-banner" />
        <h4 className="firsat">Fırsatı Kaçırma</h4>
        <Container>
          <div className="text-content">
            <h2>KOD ACIKTIRIR</h2>
            <h2>PIZZA DOYURUR</h2>
          </div>
        </Container>
      </div>
      <div>
        <Button
          variant="contained"
          size="large"
          onClick={hungryButtonClick}
          className="container-button"
          style={{ backgroundColor: "#fdc913", color: "black" }}
        >
          ACIKTIM
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default Home;
