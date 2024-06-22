
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth"; // Assuming this hook provides the logged-in user's information
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AgentProfile = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); // Assuming useAuth hook provides the logged-in user's details

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // Filter users to find the logged-in user's profile
    const loggedInUser = users.find(u => u.email === user.email);

    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl text-start">Agent Profile</h2>
            </div>
            {loggedInUser ? (
                <div className="p-4 border rounded shadow">
                    <img src={loggedInUser.imageURL} alt={loggedInUser.name} className="w-24 h-24 rounded-full mx-auto" />
                    <h3 className="text-xl font-bold mt-2">{loggedInUser.name}</h3>
                    <p>Email: {loggedInUser.email}</p>
                </div>
            ) : (
                <p>No user profile found.</p>
            )}
        </div>
    );
};

export default AgentProfile;

