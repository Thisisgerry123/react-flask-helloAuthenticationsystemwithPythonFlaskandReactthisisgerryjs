import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Private = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = actions.checkAuthentication();
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [actions, navigate]);

    return (
        <div>
            <h1>Welcome to the Private Page</h1>
            {/* Your private content here */}
        </div>
    );
};

export default Private;
