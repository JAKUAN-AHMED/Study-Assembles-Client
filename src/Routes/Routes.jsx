import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Errorpage from "../Pages/NotFound/Errorpage";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import AssaignmentForm from "../Pages/AssaignmentsForm/AssaignmentForm";
import PrivateRoutes from "../Utility/Private/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout></Layout>,
    errorElement: <Errorpage></Errorpage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/create",
        element: (
          <PrivateRoutes>
            <AssaignmentForm></AssaignmentForm>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
export default router;