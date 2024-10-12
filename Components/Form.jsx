import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import axios from "axios";

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

const DOUGH_LIST = [
  { dough: "thin", price: 0, label: "İnce" },
  { dough: "normal", price: 50, label: "Normal" },
];

const SIZE_LIST = [
  { size: "small", price: 0, label: "Küçük" },
  { size: "medium", price: 50, label: "Orta" },
  { size: "large", price: 100, label: "Büyük" },
];

////////////////////////////////////

const Form = () => {
  const [size, setSize] = useState("");
  const [toppings, setToppings] = useState([]);
  const [adiniz, setAdiniz] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [additionalTotal, setAdditionalTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dough, setDough] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const unitPrice = 125;

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
    setSubmitLoading(true);
    setErrorMessage("");

    if (submitLoading) {
      return;
    }

    axios({
      method: "post",
      url: "https://reqres.in/api/pizza",
      data: {
        size: size,
        dough: dough,
        toppings: toppings,
        name: adiniz,
        orderNote: orderNote,
        totalPrice: totalPrice,
        additionalTotalPrice: additionalTotal,
      },
    })
      .then((response) => {
        console.log(response.data);
        navigate("/order-success", {
          state: {
            orderDetails: response.data,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(
          "İnternet bağlantısı yok veya başka bir hata oluştu. Lütfen tekrar deneyin."
        );
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  // FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM

  return (
    <>
      <Container maxWidth="sm">
        <Price />

        <form onSubmit={handleSubmit}>
          <SizeandDoughSelect
            size={size}
            handleSizeChange={handleSizeChange}
            dough={dough}
            handleDoughChange={handleDoughChange}
          />

          <Toppings
            toppings={toppings}
            handleToppingChange={handleToppingChange}
          />

          <NameInput handleAdinizChange={handleAdinizChange} />

          <SiparisNotu setOrderNote={setOrderNote} />

          {errorMessage && (
            <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
          )}

          <QuantityandOrderSummary
            unitPrice={unitPrice}
            toppings={toppings}
            size={size}
            totalPrice={totalPrice}
            additionalTotal={additionalTotal}
            setAdditionalTotal={setAdditionalTotal}
            setTotalPrice={setTotalPrice}
          />

          <SubmitButton
            isSubmitDisabled={isSubmitDisabled()}
            submitLoading={submitLoading}
          />
        </form>
      </Container>
    </>
  );
};
// FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM

// FİYAT PUAN & PUANLAMA SAYISI

function Price() {
  const pizzaName = "Margarita";
  const price = 20;
  const rating = 4.5;
  const ratingCount = 120;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography>{pizzaName}</Typography>
      </Grid>
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
            {SIZE_LIST.map((sizeObject) => {
              return (
                <FormControlLabel
                  key={sizeObject.size}
                  value={sizeObject.size}
                  control={<Radio />}
                  label={sizeObject.label}
                  style={FormControlLabelStyle}
                />
              );
            })}
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

            {DOUGH_LIST.map((doughObject) => {
              return (
                <MenuItem key={doughObject.dough} value={doughObject.dough}>
                  {doughObject.label}
                </MenuItem>
              );
            })}
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

function Toppings({ toppings, handleToppingChange }) {
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

function SiparisNotu({ setOrderNote }) {
  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <TextField
          onChange={(event) => setOrderNote(event.target.value)}
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
  setAdditionalTotal,
  setTotalPrice,
  additionalTotal,
  totalPrice,
  size,
  unitPrice,
  toppings,
}) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const sizePrice =
      SIZE_LIST.find((sizeObject) => sizeObject.size === size)?.price || 0;

    const toppingsPrice = toppings.length * 5;

    const additionalTotal = sizePrice + toppingsPrice;

    const finalPrice = (unitPrice + additionalTotal) * quantity;

    setAdditionalTotal(additionalTotal * quantity);

    setTotalPrice(finalPrice);
  }, [size, quantity, toppings]);
  const quantityIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const quantityDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
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
                  <TableCell style={{ border: "none" }}>Seçimler</TableCell>
                  <TableCell align="right" style={{ border: "none" }}>
                    {additionalTotal} TL
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ border: "none" }}>Total</TableCell>
                  <TableCell align="right">{totalPrice} TL</TableCell>
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

function SubmitButton({ isSubmitDisabled, submitLoading }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        style={{ width: "65.4%", height: "62px" }}
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitDisabled || submitLoading}
      >
        Siparişi Oluştur
      </Button>
    </div>
  );
}

// VE NİHAYETİNDE KARA TOPRAK

export default Form;
