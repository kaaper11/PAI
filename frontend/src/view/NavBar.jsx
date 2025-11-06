import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const NavBar = () => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            if (token) {
                const response = await api.get("/users/name", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(response.data);
                setName(response.data.firstName + " " + response.data.lastName);
                setRole(response.data.role);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Błąd podczas pobierania danych użytkownika");
        }
    };

    const handleLogout = async () => {
        try {
            const response = await api.delete("/users/logout", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                sessionStorage.removeItem("token");
            }

            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Błąd podczas wylogowywania");
            console.error("handleLogout error:", err);
        }
    };

    const params = new URLSearchParams(window.location.search);

    useEffect(() => {
        const googleToken = params.get("token");
        if (googleToken) {
            sessionStorage.setItem("token", googleToken);
            window.history.replaceState({}, document.title, "/MainPage");
        }
        fetchData();
    }, []);

    const handleAdmin = () => {
        navigate("/AdminPage");
    };

    const toMain = () => {
        navigate("/MainPage");
    };
    const handleModeration = () => {
        navigate("/ModPage");
    }
    const handleSearch = () => {
        navigate(`/SearchPage?name=${encodeURIComponent(query)}`);

    }

    return (
        <div>
            <nav className=" mx-auto flex flex-row items-center justify-between h-15 bg-blue-300">

                    <a className="font-bold text-2xl text-white pl-4 cursor-pointer"  onClick={toMain}>
                        PAI
                    </a>

                <div className=" hidden pl-30 md:pl-20 md:flex md:flex-row md:gap-0.5 lg:pl-80 xl:pl-20">
                    <a onClick={handleSearch} className="flex items-center justify-center h-9 w-9 bg-gray-300 rounded-l-md shadow-lg cursor-pointer">
                        <img src="./public/lupa2.webp" />
                    </a>


                    <div className="flex relative">
                        <input value={query} onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search..."
                            className="flex items-center justify-center min-w-0 h-9 text-blue-300 bg-white rounded-r-sm px-1"
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center flex-row gap-4 md:gap-9 lg:gap-15 pr-4">
                    {role === "Administrator" && (
                        <a className="text-white font-bold cursor-pointer" onClick={handleAdmin}>
                            Admin
                        </a>
                    )}
                    {role === "mod" && (
                        <a className="text-white font-bold cursor-pointer" onClick={handleModeration}>
                            Moderate
                        </a>
                    )}
                    <img src="./public/koszyk.png" />
                    <a onClick={handleLogout} className="text-sm font-bold text-white md:text-lg cursor-pointer">
                        Logout
                    </a>
                    <p className="text-sm font-bold text-white md:text-lg">{name}</p>
                </div>
            </nav>
            {/*<div className="flex justify-center items-center h-10 w-10 bg-gray-300 md:hidden rounded-b-md shadow-2xl cursor-pointer">*/}
            {/*    <img src="./public/lupa2.webp" alt="Lupa" />*/}
            {/*</div>*/}
        </div>
    );
};

export default NavBar;
