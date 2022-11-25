import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import "./NavBar.css";

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
    const navItems = (
        <>
            <li>
                <NavLink className="px-4 py-4 mx-2 rounded-b-2xl" to="/home">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink className="px-4 py-4 mx-2 rounded-b-2xl" to="/blog">
                    Blog
                </NavLink>
            </li>
            {user?.uid ? (
                <li>
                    <button onClick={logout} className="px-4 py-4 mx-2 rounded-b-2xl">
                        Log Out
                    </button>
                </li>
            ) : (
                <>
                    <li>
                        <NavLink className="px-4 py-4 mx-2 rounded-b-2xl" to="/login">
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="px-4 py-4 mx-2 rounded-b-2xl" to="/register">
                            Register
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );
    return (
        <div className="navbar bg-base-100 pt-0 min-h-0">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {navItems}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">{navItems}</ul>
            </div>
            <div className="navbar-end">
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        {user?.uid && (
                            <>
                                <div className=" flex flex-row items-center">
                                    <div>
                                        <p>{user?.displayName}</p>
                                    </div>
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={user?.photoURL} alt="" />
                                        </div>
                                    </label>
                                </div>
                            </>
                        )}
                        <ul
                            tabIndex={0}
                            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <Link className="px-4 py-4 mx-2 rounded-b-2xl" to="/add-a-product">
                                    Add A Product
                                </Link>
                            </li>
                            <li>
                                <Link className="px-4 py-4 mx-2 rounded-b-2xl" to="/all-seller">
                                    All Seller
                                </Link>
                            </li>
                            <li>
                                <Link className="px-4 py-4 mx-2 rounded-b-2xl" to="/all-user">
                                    All User
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
