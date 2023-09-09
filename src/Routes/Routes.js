import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Login from "../Pages/Login";
import Signup from "../Pages/SignUp/SignUp";
import ErrorPage from "../Pages/ErrorPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../Pages/Dashboard";
import AddMessage from "../Pages/AddMessage";
import Profile from "../Pages/Profile/Profile";
import AddClass from "../Pages/AddClass";
import AllTeachers from "../Pages/AllTeachers/AllTeachers";
import Schedule from "../Pages/Admin/Schedule";
import SingleSchedule from "../Pages/Faculty/SingleSchedule";
import IndividualMessagesData from "../Pages/Faculty/IndividualMessagesData";
import Messages from "../Pages/Admin/Messages";
import FacultyTeachers from "../Pages/AllTeachers/FacultyTeachers";
import Deadline from "../Pages/Admin/Deadline";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/addclass",
        element: <AddClass></AddClass>,
      },
      {
        path: "/dashboard/addmessage",
        element: <AddMessage></AddMessage>,
      },
      {
        path: "/dashboard/messages",
        element: <IndividualMessagesData></IndividualMessagesData>,
      },
      {
        path: "/dashboard/allmessages",
        element: <Messages></Messages>,
      },
      {
        path: "/dashboard/schedule",
        element: <Schedule></Schedule>,
      },
      {
        path: "/dashboard/individualSchedule",
        element: <SingleSchedule></SingleSchedule>,
      },
      {
        path: "/dashboard/allteachers",
        element: <AllTeachers></AllTeachers>,
      },
      {
        path: "/dashboard/teachers",
        element: <FacultyTeachers></FacultyTeachers>,
      },
      {
        path: "/dashboard/deadline",
        element: <Deadline></Deadline>,
      },
    ],
  },
]);
