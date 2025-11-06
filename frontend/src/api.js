// src/api.js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true, // potrzebne, żeby refresh token z cookies działał
});

// 🔁 Interceptor do automatycznego odświeżania access tokena
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Jeśli backend zwróci 401 (token wygasł)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Wywołujemy /refresh żeby dostać nowy access token
                const refreshResponse = await api.post("/users/refresh");
                const newToken = refreshResponse.data.token;

                // Zapisujemy nowy token
                sessionStorage.setItem("token", newToken);

                // Dodajemy nowy token do oryginalnego requestu i go powtarzamy
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (err) {
                console.log("❌ Nie udało się odświeżyć tokena:", err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
