import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';

const useProperties = () => {
    const axiosPublic = useAxiosPublic();
    const { isAuthenticated } = useAuth();

    const { data: properties = [], error, isLoading, refetch } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const response = await axiosPublic.get('/properties');
            // console.log(response.data)
            return response.data;
            
        },
        enabled: isAuthenticated, // Only run query if the user is authenticated
    });

    return { properties, error, isLoading, refetch };
};

export default useProperties;
