import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

    const { user } = useSelector((store) => store.auth);

    // agar login nahi hai
    if (!user) {
        return <Navigate to="/login" />;
    }

    // agar recruiter nahi hai
    if (user.role !== "recruiter") {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;