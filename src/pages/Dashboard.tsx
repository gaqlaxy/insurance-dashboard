import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
	const { user, signOut } = useAuth();
	const navigate = useNavigate();

	const handleSignOut = async () => {
		await signOut();
		navigate("/signin");
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<header className="flex justify-between items-center mb-8">
				<h1 className="text-2xl font-bold">Insurance Dashboard</h1>
				<div className="flex items-center space-x-4">
					<span className="text-gray-700">{user?.email}</span>
					<button
						type="button"
						onClick={handleSignOut}
						className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
					>
						Sign Out
					</button>
				</div>
			</header>

			<main>
				{/* Placeholder for future dashboard widgets */}
				<div className="text-center text-gray-600">
					Welcome to your dashboard!
					<br />
					More features coming soon.
				</div>
			</main>
		</div>
	);
}
