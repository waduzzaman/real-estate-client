import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";

import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import AllProperties from "../pages/AllProperties/AllProperties";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import FeaturedProperties from "../pages/Home/FeaturedProperties/FeaturedProperties";
import Details from "../pages/Details/Details";
import Wishlist from "../pages/Wishlist/Wishlist";
import Reviews from "../pages/Reviews/Reviews";
import UserProfile from "../pages/Dashboard/UserProfile/UserProfile";
import PropertyBought from "../pages/Dashboard/PropertyBougth/PropertyBought";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
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
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      // {
      //   path: "/details/:id",
      //   element: <Details></Details>
      // },
      {
        path: "/featuredProperties",
        element: <FeaturedProperties></FeaturedProperties>,
      },
      {
        path: "/wishlist",
        element: (
          //<PrivateRoute>
          <Wishlist></Wishlist>
          //</PrivateRoute>
        ),
      },
      {
        path: "/reviews",
        element: (
          //<PrivateRoute>
          <Reviews></Reviews>

          //</PrivateRoute>
        ),
      },
      {
        path: "/allProperties",
        element: (
          <PrivateRoute>
            <AllProperties></AllProperties>
          </PrivateRoute>
        ),
      },
      {
        path: "details/:id",
        element: (
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // normal user routes
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "myProfile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "wishlist",
        element: <Wishlist></Wishlist>,
      },
      {
        path: "propertyBought",
        element: <PropertyBought></PropertyBought>,
      },
      {
        path: "reviews",
        element: <Reviews></Reviews>,
      },

      // Agent only routes

      



      // admin only routes
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
   
      {
        path: "adminProfile",
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },
      {
        path: "updateItem/:id",
        element: (
          <AdminRoute>
            <UpdateItem></UpdateItem>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://bistro-boss-server-seven-sage.vercel.app/menu/${params.id}`
          ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      // {
      //   path: "users",
      //   element: (
      //     <AdminRoute>
      //       <AllUsers></AllUsers>
      //     </AdminRoute>
      //   ),
      // },
    ],
  },
]);
