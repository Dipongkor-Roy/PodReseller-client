import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);

    useEffect(() => {
        // Request interceptor to add authorization header for every secure call to the API
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('access-token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                // Do something with request error
                return Promise.reject(error);
            }
        );

        // Response interceptor to handle 401 and 403 status codes
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response ? error.response.status : null;
                if (status === 401 || status === 403) {
                    await logOut();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        // Cleanup function to remove interceptors when the component is unmounted
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
