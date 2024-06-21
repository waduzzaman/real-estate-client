import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAgent = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const { data: isAgent = false, isLoading: isAgentLoading, error } = useQuery({
        queryKey: [user?.email, 'isAgent'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            if (!user?.email) {
                return false;
            }
            try {
                const res = await axiosSecure.get(`/users/${user.email}`);
                return res.data?.agent || false;
            } catch (error) {
                console.error('Error fetching agent status:', error);
                return false;
            }
        },
    });

    if (error) {
        console.error('Error in useQuery:', error);
    }

    return [isAgent, isAgentLoading];
};

export default useAgent;
