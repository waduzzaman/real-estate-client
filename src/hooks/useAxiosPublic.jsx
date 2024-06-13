import axios from "axios";

const axiosPublic = axios.create({
    // baseURL: 'https://real-estate-server-nu.vercel.app/'
    baseURL: 'http://localhost:5000'
        // console.log(useAxiosPublic);
})

const useAxiosPublic = () => {
    // console.log(useAxiosPublic);
    return axiosPublic;
    
};

export default useAxiosPublic;