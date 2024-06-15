import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch,  FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
// import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import { FaUser } from "react-icons/fa6";


const Dashboard = () => {
   
    // Check if there is admin

    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/adminProfile">
                                    <FaHome></FaHome>
                                    Admin Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageProperties">
                                    <FaUtensils></FaUtensils>
                                    Manage Properties</NavLink>
                            </li>
                           
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaBook></FaBook>
                                    Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageReviews">
                                    <FaUsers></FaUsers>
                                    Manage Reviews</NavLink>
                            </li>
                        </>
                            :
                            <>
                            {/* Normal user Routes */}
                                <li>
                                    <NavLink to="/dashboard/userHome">
                                        <FaHome></FaHome>
                                        User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myProfile">
                                       <FaUser></FaUser>
                                        My Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/wishlist">
                                       <FaUser></FaUser>
                                        WishList</NavLink>
                                </li>
                              
                                <li>
                                    <NavLink to="/dashboard/propertyBought">
                                        <FaCalendar></FaCalendar>
                                        Property Bought</NavLink>
                                </li>                              
                               
                                <li>
                                    <NavLink to="/dashboard/reviews">
                                        <FaList></FaList>
                                        My Reviews</NavLink>
                                </li>
                                {/* <li>
                                    <NavLink to="/dashboard/users">
                                        <FaList></FaList>
                                        All Users</NavLink>
                                </li> */}

                                
                            </>
                            
                            
                    }
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>                  
                    <li>
                        <NavLink to="/order/contact">
                            <FaEnvelope></FaEnvelope>
                            Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;