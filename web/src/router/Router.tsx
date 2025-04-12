import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import TrainInformation from "../Pages/TrainInformation";
import Contact from "@/Pages/Contact";
import Profile from "@/Pages/Profile";
import PurchaseHistory from "@/Pages/PurchaseHistory";
import VerifyTicket from "@/Pages/VerifyTicket";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "train-information",
        element: <TrainInformation />,
      },
      {
        path: "contact-us",
        element: <Contact />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "purchase-history",
        element: <PurchaseHistory />,
      },
      {
        path: "verify-ticket",
        element: <VerifyTicket />,
      },
    ],
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);
