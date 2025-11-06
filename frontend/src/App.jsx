import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import api from "./api.js"; // ⬅️ używamy naszego api zamiast axios

import LoginPage from "./view/LoginPage.jsx";
import MainPage from "./view/MainPage.jsx";
import RegisterPage from "./view/RegisterPage.jsx";
import NavBar from "./view/NavBar.jsx";
import AdminPage from "./view/AdminPage.jsx";
import AddPhotosPage from "./view/AddPhotosPage.jsx";
import AddCategoryPage from "./view/AddCategoryPage.jsx";
import AssignCategoryPage from "./view/AssignCategoryPage.jsx";
import ModPage from "./view/ModPage.jsx";
import AddProductPage from "./view/AddProductPage.jsx";
import ProductPage from "./view/ProductPage.jsx";
import SearchPage from "./view/SearchPage.jsx";

function Lay() {
    const location = useLocation();
    const hide = ["/", "/RegisterPage"];
    const navHide = hide.includes(location.pathname);

    return (
        <div>
            {!navHide && <NavBar />}
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/MainPage" element={<MainPage />} />
                <Route path="/RegisterPage" element={<RegisterPage />} />
                <Route path="/AdminPage" element={<AdminPage />} />
                <Route path="/AddPhotosPage" element={<AddPhotosPage />} />
                <Route path="/AddCategoryPage" element={<AddCategoryPage />} />
                <Route path="/ModPage" element={<ModPage />} />
                <Route path="/AddProductPage" element={<AddProductPage />} />
                <Route path="/ProductPage" element={<ProductPage />} />
                <Route path="/SearchPage" element={<SearchPage />} />
                <Route path="/AssignCategoryPage" element={<AssignCategoryPage />} />
            </Routes>
        </div>
    );
}

export default function App() {
    const handleRefresh = async () => {
        try {
            const response = await api.post("/users/refresh"); // ⬅️ api zamiast axios
            if (response.data.token) {
                sessionStorage.setItem("token", response.data.token);
            }
        } catch (error) {
            console.log("Błąd przy odświeżaniu tokena:", error);
        }
    };

    useEffect(() => {
        handleRefresh(); // od razu po starcie aplikacji
        const interval = setInterval(handleRefresh, 14 * 60 * 1000); // co 14 minut
        return () => clearInterval(interval);
    }, []);

    return (
        <Router>
            <Lay />
        </Router>
    );
}
