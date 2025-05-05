import { useEffect } from "react";
import { supabase } from "./supabaseClient";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PasswordReset from "./pages/PasswordReset";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import AdminPanel from "./pages/AdminPanel";
import AdminPolicies from "./pages/AdminPolicies";

function App() {
	useEffect(() => {
		supabase
			.from("policies")
			.select("*")
			.limit(1)
			.then(({ data, error }) => {
				console.log("Supabase test:", { data, error });
			});
	}, []);
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/reset-password" element={<PasswordReset />} />
				<Route
					path="/dashboard/*"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin"
					element={
						<ProtectedRoute allowedRoles={["admin"]}>
							<AdminPanel />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/policies"
					element={
						<ProtectedRoute allowedRoles={["admin"]}>
							<AdminPolicies />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
