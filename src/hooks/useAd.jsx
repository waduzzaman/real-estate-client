import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';

const useAd = () => {
    const axiosPublic = useAxiosPublic();
    const { isAuthenticated } = useAuth();

    const { data: properties = [], error, isLoading, refetch } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const response = await axiosPublic.get('/properties');
            return response.data;
        },
        enabled: isAuthenticated, // Only run query if the user is authenticated
    });

    const adProperties = properties.filter(property => property.advertisement === "Yes");

    return { adProperties, error, isLoading, refetch };
};

export default useAd;
