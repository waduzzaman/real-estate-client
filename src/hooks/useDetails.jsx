
import { useParams } from 'react-router-dom';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useDetails = () => {    
    const axiosPublic=useAxiosPublic();
    const {id}=useParams();
    
    //tan stack query 
    const{data:details=[]} =useQuery({
        queryKey:['details'],
        queryFn:async()=>{
            const res=await axiosPublic.get(`/properties/${id}`)
            return res.data;

        }
    })
    return [details]

};

export default useDetails;
