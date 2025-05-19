import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function NotLoggedInRoute() {
    const { user, isLoading } = useSelector((state) => state.auth);

    if (isLoading) return <div>Loading...</div>;

    return user ? <Navigate to="/" /> : <Outlet />;
}
