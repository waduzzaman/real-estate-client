
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const { data: isAdmin = false, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            // Check if user is available before making the request
            if (!user?.email) return false;
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            return res.data?.admin;
        },
        // Optionally, retry or refetch configurations can be added here
    });

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
