// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";

// const useAgent = () => {
//     const { user, loading } = useAuth();
//     const axiosSecure = useAxiosSecure();
    
//     const { data: isAgent = false, isPending: isAgentLoading } = useQuery({
//         queryKey: [user?.email, 'isAgent'],
//         enabled: !loading,
//         queryFn: async () => {
//             // Check if user is available before making the request
//             if (!user?.email) return false;
//             const res = await axiosSecure.get(`/users/agent/${user.email}`);
//             // console.log(res.data.agentName);
            
//             return res.data?.agent;
//         },
        
//     });

//     return [isAgent, isAgentLoading];
// };

// export default useAgent;


import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAgent = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const { data: isAgentData, isPending: isAgentLoading } = useQuery({
        queryKey: [user?.email, 'isAgent'],
        enabled: !loading,
        queryFn: async () => {
            // Check if user is available before making the request
            if (!user?.email) return { isAgent: false, displayName: '', email: '' };
            const res = await axiosSecure.get(`/users/agent/${user.email}`);
            // console.log(res.data);
            return {
                isAgent: res.data?.agent,
                displayName: user.displayName,
                email: user.email                
            };

           
        },
        
    });
    // console.log('agentemail',user.email)
    // console.log('displayName',user.displayName)

    const isAgent = isAgentData?.isAgent ?? false;
    const agentDisplayName = isAgentData?.displayName ?? '';
    const agentEmail = isAgentData?.email ?? '';
    // console.log(agentEmail);

    return [isAgent, isAgentLoading, agentDisplayName, agentEmail];
};

export default useAgent;


