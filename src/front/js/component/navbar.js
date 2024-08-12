import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {
        actions.logout();
        navigate('/Log_in');
    };

    const handleAuthButton = () => {
        if (store.authToken) {
            navigate('/Private');
        } else {
            navigate('/Log_in');
        }
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Cool website where you can login</span>
                </Link>
                <div className="ml-auto justify-content-center">
                    {store.authToken ? (
                        <>
                            <button className="btn btn-secondary mr-2" onClick={() => navigate('/Private')}>
                                Dashboard
                            </button>
                            <button className="btn btn-danger" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-primary mr-2" onClick={() => navigate('/Log_in')}>
                                Login
                            </button>
                            <button className="btn btn-success" onClick={() => navigate('/Signup')}>
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
