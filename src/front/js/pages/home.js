import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
    const { store } = useContext(Context);

    return (
        <div className="text-center mt-5">
            <h1>Hello Welcome</h1>
            {store.authToken ? (
                <p>Welcome back! Go to your <Link to="/private">Dashboard</Link>.</p>
            ) : (
                <p>Please <Link to="/Log_in">login</Link> or <Link to="/Signup">sign up</Link> to continue.</p>
            )}
        </div>
    );
};
