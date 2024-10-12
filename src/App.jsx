import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import OrderSuccess from "./Pages/OrderSuccess";
import CreateOrder from "./Pages/CreateOrder";
import Logo from "./Logo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create-order",
    element: <CreateOrder />,
  },
  {
    path: "/order-success",
    element: <OrderSuccess />,
  },
]);

const App = () => {
  return (
    <>
      <Logo />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
