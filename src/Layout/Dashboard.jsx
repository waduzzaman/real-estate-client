
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useAgent from '../hooks/useAgent';
import { FaUser, FaHome, FaBook, FaCalendar, FaUsers, FaUtensils, FaList, FaEnvelope } from 'react-icons/fa';

const Dashboard = () => {
    const [isAdmin] = useAdmin(); // Custom hook to check if user is admin
    const [isAgent] = useAgent(); // Custom hook to check if user is agent

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {isAdmin && (
                        <>
                            <li>
                                <NavLink to="/dashboard/adminHome">
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
                    {isAgent && (
                        <>
                            <li>
                                <NavLink to="/dashboard/agentHome">
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
                    {!isAdmin && !isAgent && (
                        <>
                            <li>
                                <NavLink to="/dashboard/user/userHome">
                                    <FaHome /> User Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myProfile">
                                    <FaUser /> My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/wishlist">
                                    <FaUser /> Wishlist
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/userWishlist">
                                    <FaUser /> User Wishlist
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/propertyBought">
                                    <FaCalendar /> Property Bought
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/reviews">
                                    <FaList /> My Reviews
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allUsers">
                                    <FaList /> All Users
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


