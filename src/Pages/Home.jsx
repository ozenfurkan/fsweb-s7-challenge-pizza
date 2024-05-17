import Header from "../../Components/Header";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button"; // Correct import for Button

const Home = () => {
  const navigate = useNavigate();

  const hungryButtonClick = () => {
    navigate("/create-order");
  };

  return (
    <>
      <Header />
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={hungryButtonClick}
      >
        ACIKTIM
      </Button>
    </>
  );
};

export default Home;
