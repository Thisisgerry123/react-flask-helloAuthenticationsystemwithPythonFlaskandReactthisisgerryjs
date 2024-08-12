import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {
        actions.logout();
        navigate('/login');
    };

    const handleAuthButton = () => {
        if (store.authToken) {
            navigate('/private');
        } else {
            navigate('/login');
        }
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">React Boilerplate</span>
                </Link>
                <div className="ml-auto">
                    {store.authToken ? (
                        <>
                            <button className="btn btn-secondary mr-2" onClick={() => navigate('/private')}>
                                Dashboard
                            </button>
                            <button className="btn btn-danger" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-primary mr-2" onClick={() => navigate('/login')}>
                                Login
                            </button>
                            <button className="btn btn-success" onClick={() => navigate('/signup')}>
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
