import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Errorpage from "../Pages/NotFound/Errorpage";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import PrivateRoutes from "../Utility/Private/PrivateRoutes";
import Assignments from "../Pages/Assignments/Assingnments";
import AssignmentForm from "../Pages/AssignmentsForm/AssignmentForm";
import PendingAssignments from "../Pages/PendingAssignments/PendingAssignments";
import ViewPage from "../Pages/ViewPage/ViewPage";
import SubmittedAssaignments from "../Pages/SubmittedAssaingments/SubmittedAssaignments";
import GiveMarks from "../Pages/GiveMarks/GiveMarks";
import ContactUs from "../Pages/ContactUs/ContactUS";
import DeveloperProfile from "../Pages/Developer/DeveloperProfile";
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
        path: "/contact",
        element: (
          <PrivateRoutes>
            <ContactUs></ContactUs>
          </PrivateRoutes>
        ),
      },
      {
        path: "/developer",
        element: (
          <PrivateRoutes>
            <DeveloperProfile></DeveloperProfile>
          </PrivateRoutes>
        ),
      },
      {
        path: "/pending",
        element: (
          <PrivateRoutes>
            <PendingAssignments></PendingAssignments>
          </PrivateRoutes>
        ),
      },
      {
        path: "/mysubmission",
        element: (
          <PrivateRoutes>
            {" "}
            <SubmittedAssaignments></SubmittedAssaignments>
          </PrivateRoutes>
        ),
      },
      {
        path: "/give-marks/:id",
        element: <GiveMarks></GiveMarks>,
      },
      {
        path: "/assignments/:id",
        element: (
          <PrivateRoutes>
            <ViewPage />
          </PrivateRoutes>
        ),
        loader: async ({ params }) => {
          const response = await fetch(
            `https://study-assembles-server.onrender.com/tasks/${params.id}`
          );
          if (!response.ok) {
            throw new Response("Failed to fetch assignment", {
              status: response.status,
            });
          }
          return response.json();
        },
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