/* eslint-disable react/jsx-pascal-case */
import "./App.css";
import { useRoutes } from "react-router-dom";

import Navbar from "../components/Navbar/navbar";
import { Login } from "../pages/Login/login";
import { Contact } from "../pages/Contact/contact";
import { Homepage } from "../pages/Homepage/homepage";
import { News } from "../pages/News/news";
import { Sidebar } from "../components/Sidebar/sidebar";
import { Approve } from "../pages/Approve/approve";
import { ApproveProfile } from "../pages/ApproveProfile/approveProfile";
import { UserInfo } from "../pages/UserInfo/user_info";
import { List } from "../pages/List/list";
import { Forecast } from "../pages/Forecast/forecast";
import { Statistical } from "../pages/Statistical/statistical";
import { AddAccount } from "../pages/AddAccount/AddAccount";
import { ListAccount } from "../pages/ListAccount/ListAccount";
import { AllCar } from "../pages/AllCar/AllCar";
import { AdminSatistical } from "../pages/AdminStatistical/AdminStatistical";
import { EditAccount } from "../pages/EditAccount/editAccount";
import { AdminForecast } from "../pages/AdminForecast/AdminForecast";

function App() {
  const routing = useRoutes([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: "",
          element: <Login />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "homepage",
          element: <Homepage />,
        },
        {
          path: "news",
          element: <News />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "major",
          element: <Login />,
        },
      ],
    },
    {
      path: "/ttdk",
      element: <Navbar type="ttdk" />,
      children: [
        {
          path: "homepage",
          element: <Homepage />,
        },
        {
          path: "news",
          element: <News />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "major",
          element: <Sidebar type="ttdk" />,
          children: [
            {
              path: "",
              element: <Approve />,
            },
            {
              path: "approve",
              element: <Approve />,
            },
            {
              path: "approve/approve-profile",
              element: <ApproveProfile />,
            },
            {
              path: "statistical",
              element: <Statistical />,
            },
            {
              path: "list",
              element: <List />,
            },
            {
              path: "forecast",
              element: <Forecast />,
            },
          ],
        },
        {
          path: "user_info",
          element: <UserInfo type="ttdk" />,
        },
      ],
    },
    {
      path: "/cdk",
      element: <Navbar type="cdk" />,
      children: [
        {
          path: "",
          element: <Sidebar type="cdk" />,
          children: [
            {
              path: "",
              element: <AllCar />,
            },
            {
              path: "all-car",
              element: <AllCar />,
            },

            {
              path: "add-account",
              element: <AddAccount />,
            },
            {
              path: "list-account",
              element: <ListAccount />,
            },
            {
              path: "list-account/edit-account",
              element: <EditAccount />,
            },
            {
              path: "statistical",
              element: <AdminSatistical />,
            },
            {
              path: "forecast",
              element: <AdminForecast />,
            },
          ],
        },
        {
          path: "user_info",
          element: <UserInfo type="cdk" />,
        },
      ],
    },
    {
      path: "*",
      element: <h1>PAGE NOT FOUND</h1>,
    },
  ]);

  return routing;
}

export default App;
