import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Container,
  Grid,
  Checkbox,
  Select,
  MenuItem,
  Typography,
  Button,
  TextField,
  ButtonGroup,
} from "@mui/material";

const FormControlLabelStyle = {
  marginBottom: "10px",
  border: "none",
  fontWeight: "bold",
};

const Form = () => {
  const [size, setSize] = useState("");
  const [toppings, setToppings] = useState([]);
  const navigate = useNavigate();
  const [adiniz, setAdiniz] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [dough, setDough] = useState("");
  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };
  const handleDoughChange = (event) => {
    setDough(event.target.value);
  };

  const handleAdinizChange = (event) => {
    setAdiniz(event.target.value);
  };
  const isSubmitDisabled = () => {
    return (
      toppings.length > 10 ||
      toppings.length < 4 ||
      size === "" ||
      dough === "" ||
      adiniz.length < 3
    );
  };

  const handleToppingChange = (event) => {
    const { checked, value } = event.target;
    setToppings((prevToppings) => {
      if (checked) {
        return [...prevToppings, value];
      } else {
        return prevToppings.filter((topping) => topping !== value);
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      `Siparişin ${size} boy pizza. Ek malzemeler: ${toppings.join(", ")}` // pizzayı bir ara buraya çağır
    );
    navigate("/order-success");
  };

  const quantityIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const quantityDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const toppingsList = [
    "Pepperoni",
    "Sosis",
    "Kanada Jambonu",
    "Tavuk Izgara",
    "Soğan",
    "Domates",
    "Mısır",
    "Sucuk",
    "Jalepeno",
    "Sarımsak",
    "Biber",
    "Ananas",
    "Kabak",
    "Zeytin",
  ];

  // FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Price price={25} rating={4.5} ratingCount={100} />

        <SizeandDoughSelect
          size={size}
          handleSizeChange={handleSizeChange}
          dough={dough}
          handleDoughChange={handleDoughChange}
        />

        <EkMalzeme
          toppings={toppings}
          toppingsList={toppingsList}
          handleToppingChange={handleToppingChange}
        />

        <NameInput handleAdinizChange={handleAdinizChange} />

        <SiparisNotu />

        <QuantityandOrderSummary
          quantityDecrease={quantityDecrease}
          quantityIncrease={quantityIncrease}
          setQuantity={setQuantity}
          quantity={quantity}
        />

        <SubmitButton isSubmitDisabled={isSubmitDisabled()} />
      </form>
    </Container>
  );
};

// FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM

// FİYAT PUAN & PUANLAMA SAYISI

function Price({ price, rating, ratingCount }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Typography>{price} TL</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          {rating} ({ratingCount})
        </Typography>
      </Grid>
    </Grid>
  );
}

// BOYUT VE HAMUR SEÇİMİ

function SizeandDoughSelect({
  size,
  handleSizeChange,
  dough,
  handleDoughChange,
}) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Boyut Seçiniz</FormLabel>
          <RadioGroup
            aria-label="size"
            name="size"
            value={size}
            onChange={handleSizeChange}
          >
            <FormControlLabel
              value="kucuk"
              control={<Radio />}
              label="Küçük"
              style={FormControlLabelStyle}
            />
            <FormControlLabel
              value="orta"
              control={<Radio />}
              label="Orta"
              style={FormControlLabelStyle}
            />
            <FormControlLabel
              value="buyuk"
              control={<Radio />}
              label="Büyük"
              style={FormControlLabelStyle}
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Hamur Seç</FormLabel>
          <Select
            value={dough}
            onChange={handleDoughChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="" disabled>
              Hamur Kalınlığını Seçiniz
            </MenuItem>
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="incedough">İnce Hamur</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

// İSİM INPUTU

function NameInput({ handleAdinizChange }) {
  return (
    <FormControl fullWidth>
      <TextField
        id="name"
        label="Adınız"
        placeholder="Örneğin: Ahmet"
        onChange={handleAdinizChange}
      />
    </FormControl>
  );
}

// EK MALZEME SEÇİMİ

function EkMalzeme({ toppings, handleToppingChange, toppingsList }) {
  return (
    <Grid item xs={12}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Ek Malzemeler</FormLabel>
        <Typography variant="caption" color="textSecondary">
          En fazla 10 malzeme seçebilirsiniz. Her ek malzeme için fiyat 5 TL
          artacaktır.
        </Typography>
        <Grid container>
          {toppingsList.map((topping, index) => (
            <Grid item xs={4} key={topping}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={toppings.includes(topping)}
                    onChange={handleToppingChange}
                    value={topping}
                  />
                }
                label={topping}
                style={{
                  marginBottom: "10px",
                  border: "none",
                  fontWeight: "bold",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </FormControl>
    </Grid>
  );
}

// SİPARİŞ NOTU

function SiparisNotu() {
  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <TextField
          id="siparisNotu"
          label="Sipariş Notu"
          multiline
          rows={1}
          fullWidth
          placeholder="Örneğin: Geldiğinizde arayınız."
        />
      </FormControl>
    </Grid>
  );
}

// + - BUTONLARI ve SİPARİŞ ÖZETİ

function QuantityandOrderSummary({
  quantityDecrease,
  quantityIncrease,
  setQuantity,
  quantity,
}) {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button onClick={quantityDecrease}>-</Button>
            <TextField
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              style={{ width: "50px", textAlign: "center" }}
            />
            <Button onClick={quantityIncrease}>+</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={8}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    colSpan={2}
                    style={{ border: "none" }}
                  >
                    Sipariş Toplamı
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell style={{ border: "none" }}>Subtotal</TableCell>
                  <TableCell
                    align="right"
                    style={{ border: "none" }}
                  ></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ border: "none" }}>Total</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

// SİPARİŞ OLUŞTUR BUTONU

function SubmitButton({ isSubmitDisabled }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        style={{ width: "65.4%", height: "62px" }}
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitDisabled}
      >
        Siparişi Oluştur
      </Button>
    </div>
  );
}

// VE NİHAYETİNDE KARA TOPRAK

export default Form;
