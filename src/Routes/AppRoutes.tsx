import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Welcome from "../pages/Welcome";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    )
}