
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();


    const makeRequest = async (config) => {
        try {
            const response = await axiosSecure(config);
            return response;
        } catch (error) {
            const status = error.response?.status;
            if (status === 401 || status === 403) {
                await logOut();
                navigate('/login');
            }
            return Promise.reject(error);
        }
    };

    return { makeRequest };
};

export default useAxiosSecure;
