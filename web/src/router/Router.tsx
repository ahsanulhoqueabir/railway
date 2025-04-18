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
import adminRoute from "@/router/AdminRoute";
import Admin from "@/Pages/Admin";
import AddTrain from "@/Pages/admin/AddTrain";
import AddStation from "@/Pages/admin/AddStation";

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
    path: "/admin",
    element: <Admin />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <div>Admin Page</div>,
      },
      {
        path: "add-station",
        element: <AddStation />,
      },
      {
        path: "add-train",
        element: <AddTrain />,
      },
    ],
  },
  ...adminRoute,
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
