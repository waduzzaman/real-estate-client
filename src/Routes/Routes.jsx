import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AllProperties from "../pages/AllProperties/AllProperties";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import FeaturedProperties from "../pages/Home/FeaturedProperties/FeaturedProperties";
import Details from "../pages/Details/Details";
import Wishlist from "../pages/Dashboard/Wishlist/Wishlist";
import Reviews from "../pages/Reviews/Reviews";
import UserProfile from "../pages/Dashboard/UserProfile/UserProfile";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";
import AgentProfile from "../pages/Dashboard/AgentProfile/AgentProfile";
import AddProperty from "../pages/Dashboard/AddProperty/AddProperty";
import MyAddedProperties from "../pages/Dashboard/MyAddedProperties/MyAddedProperties";
import MySoldProperties from "../pages/Dashboard/MySoldProperties/MySoldProperties";
import RequestedProperties from "../pages/Dashboard/RequestedProperties/RequestedProperties";
import ManageProperties from "../pages/Dashboard/ManageProperties/ManageProperties";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import ManageReviews from "../pages/Dashboard/ManageReviews/ManageReviews";
import AgentRoute from "./AgentRoute";
import PropertyBought from "../pages/Dashboard/PropertyBougth/PropertyBought";
import MakeOfferForm from "../pages/Dashboard/MakeOfferForm/MakeOfferForm";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/featuredProperties",
        element: <FeaturedProperties />,
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "/reviews",
        element: (
          <PrivateRoute>
            <Reviews />
          </PrivateRoute>
        ),
      },
      {
        path: "/allProperties",
        element: (
          <PrivateRoute>
            <AllProperties />
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [

      // user related routes 
    
      {
        path: "userProfile",
        element: <UserProfile />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
   

      {
        path:"wishlist/makeAnOffer/:propertyId",
        element: <MakeOfferForm/>,
      },
     
      {
        path: "propertyBought",
        element: <PropertyBought />,
      },
      {
        path: "reviews",
        element: <Reviews />,
      },
      {
        path: "allUsers",
        element: (
          // <AdminRoute>
            <AllUsers />
          // </AdminRoute>
        ),
      },
      {
        path: "users",
        element: <AllUsers />,
      },
      {
        path: "manageProperties",
        element: <ManageProperties/>,
      },

      {
        path: "addProperty",
        element: (
          // <AgentRoute>
            <AddProperty />
          // </AgentRoute>
        ),
      },
      {
        path: "myAddedProperties/:id",
        element: (
          // <AgentRoute>
            <MyAddedProperties/>
          // </AgentRoute>
        ),
      },

      {
        path: "mySoldProperties",
        element: (
          // <AgentRoute>
            <MySoldProperties />
          // </AgentRoute>
        ),
      },

      // Agent Related Routes
      {
        path: "agentProfile",
        element: (
          <AgentRoute>
            <AgentProfile />
          </AgentRoute>
        ),
      },
      {
        path: "addProperty",
        element: (
          <AgentRoute>
            <AddProperty />
          </AgentRoute>
        ),
      },
      {
        path: "myAddedProperties",
        element: (
          <AgentRoute>
            <MyAddedProperties />
          </AgentRoute>
        ),
      },
      {
        path: "mySoldProperties",
        element: (
          <AgentRoute>
            <MySoldProperties />
          </AgentRoute>
        ),
      },
      {
        path: "requestedProperties",
        element: (
          <AgentRoute>
            <RequestedProperties />
          </AgentRoute>
        ),
      },

      // Admin Related Routes
     
      {
        path: "adminProfile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "manageProperties",
        element: (
          <AdminRoute>
            <ManageProperties />
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manageReviews",
        element: (
          <AdminRoute>
            <ManageReviews />
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
    ],
  },
]);
