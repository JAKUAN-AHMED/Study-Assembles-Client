import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Errorpage from "../Pages/NotFound/Errorpage";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import PrivateRoutes from "../Utility/Private/PrivateRoutes";
import Assignments from "../Pages/Assignments/Assingnments";
import AssignmentForm from "../Pages/AssignmentsForm/AssignmentForm";
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
        path: "/assignments",
        element: <Assignments></Assignments>,
      },
      {
        path: "/create",
        element: (
          <PrivateRoutes>
            <AssignmentForm></AssignmentForm>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
export default router;