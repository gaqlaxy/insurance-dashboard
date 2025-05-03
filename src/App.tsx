import { useEffect } from "react";
import { supabase } from "./supabaseClient";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PasswordReset from "./pages/PasswordReset";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";

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
				{/* Optionally add a catch-all redirect to /signin or a 404 page */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
