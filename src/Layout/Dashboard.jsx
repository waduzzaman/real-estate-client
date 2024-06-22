
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useAgent from '../hooks/useAgent';
import { FaUser, FaHome, FaBook, FaCalendar, FaUsers, FaUtensils, FaList, FaEnvelope, FaMoneyBill, FaEdit,  FaFirstOrder } from 'react-icons/fa';
import {  MdOutlineReviews } from 'react-icons/md';
import { FaHouse, FaHouseChimneyUser } from 'react-icons/fa6';

const Dashboard = () => {
    const [isAdmin] = useAdmin(); // Custom hook to check if user is admin
    const [isAgent] = useAgent(); // Custom hook to check if user is agent
    // console.log(isAdmin);

    return (
        <div className="flex">
            
            <div className="w-64 min-h-screen bg-emerald-400">
            <img className='w-20 p-2' src="/margel-logo.jpeg" alt="" />
                <ul className="menu p-4">

                    {/* Admin Nav Item */}
                    {isAdmin && (
                        <>
                            <li>
                                <NavLink to="/dashboard/adminProfile">
                                
                                    <FaUser /> Admin Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageProperties">
                                    <FaHouse /> Manage Properties
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageUsers">
                                    <FaUsers /> Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageReviews">
                                    <FaEdit /> Manage Reviews
                                </NavLink>
                            </li>
                            {/* <li>
                                <NavLink to="/dashboard/allUsers">
                                    <FaUsers /> All Users
                                </NavLink>
                            </li> */}
                        </>
                    )}

                    {/* Agent Nav Items */}
                    {isAgent && (
                        <>
                            <li>
                                <NavLink to="/dashboard/agentProfile">
                                    <FaUser /> Agent Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addProperty">
                                    <FaHouse /> Add Property
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myAddedProperties">
                                    <FaHome /> My Added Properties
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/mySoldProperties">
                                    <FaMoneyBill /> My Sold Properties
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/requestedProperties">
                                    <FaFirstOrder /> Requested Properties
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* User Nav items */}
                    {!isAdmin && !isAgent && (
                        <>
                          
                            <li>
                                <NavLink to="/dashboard/userProfile">
                                    <FaUser /> My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/wishlist">
                                    <FaList /> Wishlist
                                </NavLink>
                            </li>
                            {/* <li>
                                <NavLink to="/dashboard/makeAnOffer">
                                    <FaMoneyBill /> Make An Offer
                                </NavLink>
                            </li> */}
                            
                            <li>
                                <NavLink to="/dashboard/propertyBought">
                                    <FaCalendar /> Property Bought
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/reviews">
                                <MdOutlineReviews /> My Reviews
                                </NavLink>
                            </li>
                           
                            
                            
                        </>
                    )}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/">
                            <FaEnvelope /> Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-10 bg-gray-50">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;


