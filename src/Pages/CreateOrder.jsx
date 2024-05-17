import React, { useState } from "react";
import Form from "../../Components/Form";
import Header from "../../Components/Header";

const CreateOrder = () => {
  const [pizzaName, setPizzaName] = useState("");
  return (
    <div>
      <Header />
      <h1>{pizzaName}</h1>
      <Form />
    </div>
  );
};

export default CreateOrder;
