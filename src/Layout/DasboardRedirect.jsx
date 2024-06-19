// DashboardRedirect.js
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const DashboardRedirect = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role.includes('admin')) {
        return <Navigate to="/dashboard/admin/adminHome" />;
    } else if (user.role.includes('agent')) {
        return <Navigate to="/dashboard/agent/agentHome" />;
    } else {
        return <Navigate to="/dashboard/user/userHome" />;
    }
};

export default DashboardRedirect;
