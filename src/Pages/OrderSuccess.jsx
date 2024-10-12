import React from "react";
import { useLocation } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const { orderDetails } = location.state || {};

  return (
    <>
      <div>
        <h1>Sipariş Başarılı</h1>
        {orderDetails && (
          <div>
            <p>Boyut: {orderDetails.size}</p>
            <p>Hamur: {orderDetails.dough}</p>
            <p>Ek Malzemeler: {orderDetails.toppings.join(", ")}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderSuccess;
