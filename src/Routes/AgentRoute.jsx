import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAgent from "../hooks/useAgent"; // Assuming you have a hook to check if user is agent

const AgentRoute = ({ children }) => {
    const { user, loading } = useAuth(); // Your authentication hook
    const [isAgent, isAgentLoading] = useAgent(); // Custom hook to check if user is agent
    const location = useLocation();

    if (loading || isAgentLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isAgent) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default AgentRoute;
