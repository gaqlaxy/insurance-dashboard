// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
	children: React.ReactElement;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { user } = useAuth();
	if (!user) {
		// Not logged in—redirect to sign-in
		return <Navigate to="/signin" replace />;
	}
	return children;
}
