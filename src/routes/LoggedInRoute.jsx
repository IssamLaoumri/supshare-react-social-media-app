import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function LoggedInRoute() {
    const { isLoggedIn, isLoading } = useSelector((state) => state.auth);

    if (isLoading) return <div>Loading...</div>;

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
