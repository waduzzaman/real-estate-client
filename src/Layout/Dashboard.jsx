
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useAgent from '../hooks/useAgent';
import { FaUser, FaHome, FaBook, FaCalendar, FaUsers, FaUtensils, FaList, FaEnvelope, FaMoneyBill, FaReact, FaEdit } from 'react-icons/fa';
import { MdOutlineRateReview, MdOutlineReviews } from 'react-icons/md';
import { FaHouseChimneyUser } from 'react-icons/fa6';

const Dashboard = () => {
    const [isAdmin] = useAdmin(); // Custom hook to check if user is admin
    const [isAgent] = useAgent(); // Custom hook to check if user is agent

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">

                    {/* Admin Nav Item */}
                    {isAdmin && (
                        <>
                            <li>
                                <NavLink to="/dashboard/adminProfile">
                                    <FaHome /> Admin Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageProperties">
                                    <FaUtensils /> Manage Properties
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageUsers">
                                    <FaBook /> Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageReviews">
                                    <FaUsers /> Manage Reviews
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allUsers">
                                    <FaUsers /> All Users
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Agent Nav Items */}
                    {isAgent && (
                        <>
                            <li>
                                <NavLink to="/dashboard/agentProfile">
                                    <FaBook /> Agent Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addProperty">
                                    <FaBook /> Add Property
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myAddedProperties">
                                    <FaBook /> My Added Properties
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/mySoldProperties">
                                    <FaBook /> My Sold Properties
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/requestedProperties">
                                    <FaBook /> Requested Properties
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
                            <li>
                                <NavLink to="/dashboard/allUsers">
                                    <FaUsers /> All Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addProperty">
                                    <FaHome /> Add Property
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myAddedProperties">
                                <FaHouseChimneyUser /> My Added Properties
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/mySoldProperties">
                                    <FaHome /> My Sold Properties
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageProperties">
                                    <FaEdit /> Manage Properties
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
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;


