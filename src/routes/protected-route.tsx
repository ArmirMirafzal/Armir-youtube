import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
	allowed: boolean;
	redirectURL?: string;
}

const ProtectedRoute = ({ allowed = false, redirectURL = "/" }: ProtectedRouteProps) => {
	if (allowed) return <Outlet />;

	return <Navigate to={redirectURL} />;
};

export default ProtectedRoute;
