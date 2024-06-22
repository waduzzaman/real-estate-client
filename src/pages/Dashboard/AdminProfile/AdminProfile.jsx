
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth"; 
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminProfile = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); 

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;

           
        }
    });

    // Filter users to find the logged-in user's profile
    const loggedInUser = users.find(u => u.email === user.email);
    // console.log(loggedInUser.photoURL);

    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl capitalize font-semibold ">Admin Profile</h2>
            </div>
            {loggedInUser ? (
                <div className="p-4 border rounded shadow">
                    <img src={loggedInUser.photoURL} alt={loggedInUser.name} className="w-24 h-24 p-2 rounded-full mx-auto" />
                    <h3 className="text-xl font-bold mt-2">Name: {loggedInUser.name}</h3>
                    <p>Email: {loggedInUser.email}</p>
                    <p>Role: {loggedInUser.role}</p>
                </div>
            ) : (
                <p>No user profile found.</p>
            )}
        </div>
    );
};

export default AdminProfile;

