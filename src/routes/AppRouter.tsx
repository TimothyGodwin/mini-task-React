import React from "react"
import { Route, Routes } from "react-router-dom"
import Login from "../pages/Login/Login"
import Dashboard from "../pages/dashboard/Dashboard"
import ProtectedRoute from "./ProtectedRoute"
import HistoryData from "../pages/dashboard/HistoryData"

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/history" element={<HistoryData />} />
            </Route>
        </Routes>
    )
}

export default AppRouter
