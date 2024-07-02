import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";

import AdminRoute from "./AdminRoute";
import AllProperties from "../pages/AllProperties/AllProperties";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import FeaturedProperties from "../pages/Home/FeaturedProperties/FeaturedProperties";
import Details from "../pages/Details/Details";
import Wishlist from "../pages/Dashboard/Wishlist/Wishlist";

import UserProfile from "../pages/Dashboard/UserProfile/UserProfile";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";
import AgentProfile from "../pages/Dashboard/AgentProfile/AgentProfile";
import AddProperty from "../pages/Dashboard/AddProperty/AddProperty";

import MySoldProperties from "../pages/Dashboard/MySoldProperties/MySoldProperties";
import RequestedProperties from "../pages/Dashboard/RequestedProperties/RequestedProperties";
import ManageProperties from "../pages/Dashboard/ManageProperties/ManageProperties";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import ManageReviews from "../pages/Dashboard/ManageReviews/ManageReviews";
import AgentRoute from "./AgentRoute";
import PropertyBought from "../pages/Dashboard/PropertyBougth/PropertyBought";
import MakeOfferForm from "../pages/Dashboard/MakeOfferForm/MakeOfferForm";
import Payment from "../pages/Dashboard/Payment/PaymentPage";
import MyAddedProperties from "../pages/Dashboard/MyAddedProperties/MyAddedProperties";
import UpdateProperty from "../pages/Dashboard/UpdateProperty/UpdateProperty";
import Reviews from "../pages/Dashboard/Reviews/Reviews";

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
        path: "makeAnOffer",
        element: <MakeOfferForm />,
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

      /******************************User Routes******************************* */

      {
        path: "userProfile",
        element: <UserProfile />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },

      {
        path: "makeAnOffer",
        element: <MakeOfferForm />,
      },

      {
        path: "propertyBought",
        element: <PropertyBought />,
      },
      {
        path: "payment",
        element: <Payment />,
      },

      {
        path: "reviews",
        element:<Reviews></Reviews> ,
      },
     
     
      /******************************Agent Routes******************************* */
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
            <MyAddedProperties></MyAddedProperties>           
            
          </AgentRoute>
        ),
      },

      {
        path: "updateProperty/:id", // Adjust the path as needed
        element: (
          <AgentRoute>
            <UpdateProperty/>
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

      /******************************Admin Routes******************************* */      
      
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
   
       

    ],
  },
]);
