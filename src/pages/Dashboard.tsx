// import React from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
// 	const { user, signOut } = useAuth();
// 	const navigate = useNavigate();

// 	const handleSignOut = async () => {
// 		await signOut();
// 		navigate("/signin");
// 	};

// 	return (
// 		<div className="min-h-screen bg-gray-50 p-6">
// 			<header className="flex justify-between items-center mb-8">
// 				<h1 className="text-2xl font-bold">Insurance Dashboard</h1>
// 				<div className="flex items-center space-x-4">
// 					<span className="text-gray-700">{user?.email}</span>
// 					<button
// 						type="button"
// 						onClick={handleSignOut}
// 						className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
// 					>
// 						Sign Out
// 					</button>
// 				</div>
// 			</header>

// 			<main>
// 				{/* Placeholder for future dashboard widgets */}
// 				<div className="text-center text-gray-600">
// 					Welcome to your dashboard!
// 					<br />
// 					More features coming soon.
// 				</div>
// 			</main>
// 		</div>
// 	);
// }

// import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { fetchPolicies } from "../services/policyService";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
// 	const { user, signOut } = useAuth();
// 	const navigate = useNavigate();

// 	// Policy data state
// 	const [policies, setPolicies] = useState<any[]>([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState<string | null>(null);

// 	// Pagination state
// 	const [page, setPage] = useState(1);
// 	const [pageSize] = useState(5); // Fixed page size
// 	const [total, setTotal] = useState(0); // Total policies (optional)

// 	// Filter state
// 	const [filters, setFilters] = useState({
// 		status: "",
// 		type: "",
// 	});

// 	// Load policies on page change or filter change
// 	useEffect(() => {
// 		const loadPolicies = async () => {
// 			setLoading(true);
// 			setError(null);

// 			try {
// 				const data = await fetchPolicies({
// 					page,
// 					pageSize,
// 					sortBy: "start_date",
// 					sortOrder: "desc",
// 					filters: {
// 						...(filters.status && { status: filters.status }),
// 						...(filters.type && { type: filters.type }),
// 					},
// 				});

// 				setPolicies(data || []);
// 				// Optional: Get total count via a separate query if needed
// 			} catch (err: any) {
// 				setError(err.message || "Failed to load policies");
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		loadPolicies();
// 	}, [page, filters]);

// 	const handleSignOut = async () => {
// 		await signOut();
// 		navigate("/signin");
// 	};

// 	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// 		const { name, value } = e.target;
// 		setFilters((prev) => ({ ...prev, [name]: value }));
// 		setPage(1); // Reset to first page on filter change
// 	};

// 	const { role } = useAuth();
// 	return (
// 		<div className="min-h-screen bg-gray-50 p-6">
// 			<header className="flex justify-between items-center mb-8">
// 				<h1 className="text-2xl font-bold">Insurance Dashboard</h1>
// 				{role === "admin" && (
// 					<Link to="/admin" className="text-blue-600 hover:underline">
// 						User Management
// 					</Link>
// 				)}
// 				<div className="flex items-center space-x-4">
// 					<span className="text-gray-700">{user?.email}</span>
// 					<button
// 						type="button"
// 						onClick={handleSignOut}
// 						className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
// 					>
// 						Sign Out
// 					</button>
// 				</div>
// 			</header>

// 			{role === "admin" && (
// 				<div className="mb-6">
// 					<Link
// 						to="/admin/policies"
// 						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// 					>
// 						View All Policies
// 					</Link>
// 				</div>
// 			)}

// 			<main className="space-y-6">
// 				{/* Filter Controls */}
// 				<div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row gap-4">
// 					<div className="flex-1">
// 						<label
// 							htmlFor="status"
// 							className="block text-sm font-medium text-gray-700 mb-1"
// 						>
// 							Status
// 						</label>
// 						<select
// 							id="status"
// 							name="status"
// 							value={filters.status}
// 							onChange={handleFilterChange}
// 							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// 						>
// 							<option value="">All Statuses</option>
// 							<option value="active">Active</option>
// 							<option value="lapsed">Lapsed</option>
// 							<option value="cancelled">Cancelled</option>
// 						</select>
// 					</div>
// 					<div className="flex-1">
// 						<label
// 							htmlFor="type"
// 							className="block text-sm font-medium text-gray-700 mb-1"
// 						>
// 							Policy Type
// 						</label>
// 						<select
// 							id="type"
// 							name="type"
// 							value={filters.type}
// 							onChange={handleFilterChange}
// 							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// 						>
// 							<option value="">All Types</option>
// 							<option value="auto">Auto</option>
// 							<option value="home">Home</option>
// 							<option value="life">Life</option>
// 							<option value="health">Health</option>
// 						</select>
// 					</div>
// 				</div>

// 				{/* Policy List */}
// 				{loading ? (
// 					<div className="text-center py-8">
// 						<div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
// 						<p className="mt-2 text-gray-600">Loading policies...</p>
// 					</div>
// 				) : error ? (
// 					<div className="bg-red-50 border-l-4 border-red-500 p-4">
// 						<p className="text-red-700">{error}</p>
// 					</div>
// 				) : policies.length === 0 ? (
// 					<div className="bg-white p-8 rounded-lg shadow-md text-center">
// 						<p className="text-gray-500">
// 							No policies found matching your criteria.
// 						</p>
// 					</div>
// 				) : (
// 					<>
// 						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// 							{policies.map((policy) => (
// 								<div
// 									key={policy.id}
// 									className="bg-white p-5 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100"
// 								>
// 									<div className="flex justify-between items-start">
// 										<h3 className="text-lg font-semibold text-gray-800">
// 											{policy.policy_number}
// 										</h3>
// 										<span
// 											className={`px-2 py-1 text-xs font-medium rounded-full ${
// 												policy.status === "active"
// 													? "bg-green-100 text-green-800"
// 													: policy.status === "lapsed"
// 														? "bg-yellow-100 text-yellow-800"
// 														: "bg-red-100 text-red-800"
// 											}`}
// 										>
// 											{policy.status.charAt(0).toUpperCase() +
// 												policy.status.slice(1)}
// 										</span>
// 									</div>
// 									<div className="mt-3 space-y-1">
// 										<p className="text-sm text-gray-600">
// 											Type: <span className="font-medium">{policy.type}</span>
// 										</p>
// 										<p className="text-sm text-gray-600">
// 											Coverage:{" "}
// 											<span className="font-medium">
// 												${policy.coverage_amount.toLocaleString()}
// 											</span>
// 										</p>
// 										<p className="text-sm text-gray-600">
// 											Valid:{" "}
// 											<span className="font-medium">
// 												{new Date(policy.start_date).toLocaleDateString()} -{" "}
// 												{new Date(policy.end_date).toLocaleDateString()}
// 											</span>
// 										</p>
// 									</div>
// 								</div>
// 							))}
// 						</div>

// 						{/* Pagination */}
// 						<div className="flex justify-center mt-6">
// 							<button
// 								onClick={() => setPage((p) => Math.max(1, p - 1))}
// 								disabled={page === 1 || loading}
// 								className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
// 							>
// 								Previous
// 							</button>
// 							<span className="mx-4 flex items-center">
// 								Page {page} of{" "}
// 								{Math.ceil(total / pageSize) || (policies.length > 0 ? "∞" : 1)}
// 							</span>
// 							<button
// 								onClick={() => setPage((p) => p + 1)}
// 								disabled={policies.length < pageSize || loading}
// 								className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
// 							>
// 								Next
// 							</button>
// 						</div>
// 					</>
// 				)}
// 			</main>
// 		</div>
// 	);
// }

// // src/pages/Dashboard.tsx

// src/pages/Dashboard.tsx
// import React, { useState, useEffect } from "react";
// import { fetchPolicies } from "../services/policyService";
// import { PolicyTypeStatusChart } from "../components/PolicyTypeStatusChart";
// import { CoverageOverTimeChart } from "../components/CoverageOverTimeChart";
// import { PolicyTypePieChart } from "../components/PolicyTypePieChart";
// import { useAuth } from "../context/AuthContext";

// export default function Dashboard() {
// 	const [policies, setPolicies] = useState<any[]>([]);
// 	const [loading, setLoading] = useState(true);

// 	useEffect(() => {
// 		const loadPolicies = async () => {
// 			const data = await fetchPolicies(); // Fetch user's policies
// 			setPolicies(data || []);
// 			setLoading(false);
// 		};
// 		loadPolicies();
// 	}, []);

// 	if (loading) return <div>Loading...</div>;

// 	const [error, setError] = useState<string | null>(null);
// 	const { user, loading: authLoading } = useAuth(); // Get user + loading from AuthContext

// 	useEffect(() => {
// 		const loadPolicies = async () => {
// 			if (!user) {
// 				setError("No authenticated user");
// 				setLoading(false);
// 				return;
// 			}

// 			try {
// 				const data = await fetchPolicies(user.id); // Pass user.id
// 				setPolicies(data || []);
// 			} catch (err: any) {
// 				setError(err.message || "Failed to load policies");
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		if (!authLoading) {
// 			loadPolicies();
// 		}
// 	}, [user, authLoading]);

// 	if (authLoading || loading) {
// 		return (
// 			<div className="flex justify-center items-center h-screen">
// 				<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
// 			</div>
// 		);
// 	}

// 	if (error) {
// 		return (
// 			<div className="flex flex-col justify-center items-center h-screen text-red-500">
// 				<p>{error}</p>
// 				<button
// 					onClick={() => window.location.reload()}
// 					className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
// 				>
// 					Retry
// 				</button>
// 			</div>
// 		);
// 	}

// 	if (policies.length === 0) {
// 		return (
// 			<div className="flex flex-col justify-center items-center h-screen text-gray-500">
// 				<p>No policies found</p>
// 				<p className="text-sm mt-2">Try creating one or check your filters</p>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="min-h-screen bg-gray-50 p-6">
// 			<header className="flex justify-between items-center mb-8">
// 				<h1 className="text-2xl font-bold">Insurance Dashboard</h1>
// 			</header>

// 			<main className="space-y-10">
// 				{/* Policy Count by Type/Status */}
// 				<section>
// 					<h2 className="text-xl font-semibold mb-4">
// 						Policy Distribution by Type & Status
// 					</h2>
// 					<PolicyTypeStatusChart policies={policies} />
// 				</section>

// 				{/* Coverage Over Time */}
// 				<section>
// 					<h2 className="text-xl font-semibold mb-4">Coverage Over Time</h2>
// 					<CoverageOverTimeChart policies={policies} />
// 				</section>

// 				{/* Policy Distribution by Type */}
// 				<section>
// 					<h2 className="text-xl font-semibold mb-4">
// 						Policy Type Distribution
// 					</h2>
// 					<PolicyTypePieChart policies={policies} />
// 				</section>
// 			</main>
// 		</div>
// 	);
// }

// import React, { useState, useEffect } from "react";
// import { fetchPolicies } from "../services/policyService";
// import { useAuth } from "../context/AuthContext";
// import { PolicyTypeStatusChart } from "../components/PolicyTypeStatusChart";
// import { CoverageOverTimeChart } from "../components/CoverageOverTimeChart";
// import { PolicyTypePieChart } from "../components/PolicyTypePieChart";

// export default function Dashboard() {
// 	const [policies, setPolicies] = useState<any[]>([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState<string | null>(null);
// 	const { user, loading: authLoading } = useAuth();

// 	useEffect(() => {
// 		const loadPolicies = async () => {
// 			if (!user) {
// 				setError("No authenticated user");
// 				setLoading(false);
// 				return;
// 			}

// 			try {
// 				const data = await fetchPolicies(user.id);
// 				setPolicies(data || []);
// 			} catch (err: any) {
// 				setError(err.message || "Failed to load policies");
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		if (!authLoading) {
// 			loadPolicies();
// 		}
// 	}, [user, authLoading]);

// 	if (authLoading || loading) {
// 		return (
// 			<div className="flex justify-center items-center h-screen">
// 				<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
// 			</div>
// 		);
// 	}

// 	if (error) {
// 		return (
// 			<div className="flex flex-col justify-center items-center h-screen text-red-500">
// 				<p>{error}</p>
// 				<button
// 					onClick={() => window.location.reload()}
// 					className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
// 				>
// 					Retry
// 				</button>
// 			</div>
// 		);
// 	}

// 	if (policies.length === 0) {
// 		return (
// 			<div className="flex flex-col justify-center items-center h-screen text-gray-500">
// 				<p>No policies found</p>
// 				<p className="text-sm mt-2">Try creating one or check your filters</p>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="min-h-screen bg-gray-50 p-6">
// 			<header className="flex justify-between items-center mb-8">
// 				<h1 className="text-2xl font-bold">Insurance Dashboard</h1>
// 			</header>

// 			<main className="space-y-10">
// 				{/* Policy Count by Type/Status */}
// 				<section>
// 					<h2 className="text-xl font-semibold mb-4">
// 						Policy Distribution by Type & Status
// 					</h2>
// 					<PolicyTypeStatusChart policies={policies} />
// 				</section>

// 				{/* Coverage Over Time */}
// 				<section>
// 					<h2 className="text-xl font-semibold mb-4">Coverage Over Time</h2>
// 					<CoverageOverTimeChart policies={policies} />
// 				</section>

// 				{/* Policy Distribution by Type */}
// 				<section>
// 					<h2 className="text-xl font-semibold mb-4">
// 						Policy Type Distribution
// 					</h2>
// 					<PolicyTypePieChart policies={policies} />
// 				</section>
// 			</main>
// 		</div>
// 	);
// }

import React, { useState, useEffect } from "react";
import { fetchPolicies } from "../services/policyService";
import { useAuth } from "../context/AuthContext";
import { PolicyTypeStatusChart } from "../components/PolicyTypeStatusChart";
import { CoverageOverTimeChart } from "../components/CoverageOverTimeChart";
import { PolicyTypePieChart } from "../components/PolicyTypePieChart";

export default function Dashboard() {
	const [policies, setPolicies] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [filters, setFilters] = useState({ status: "", type: "" });
	const { user, loading: authLoading, signOut } = useAuth();

	// Load policies when user or filters change
	useEffect(() => {
		const loadPolicies = async () => {
			if (!user) {
				setError("No authenticated user");
				setLoading(false);
				return;
			}

			try {
				const data = await fetchPolicies(user.id, filters);
				setPolicies(data || []);
			} catch (err: any) {
				setError(err.message || "Failed to load policies");
			} finally {
				setLoading(false);
			}
		};

		if (!authLoading) {
			loadPolicies();
		}
	}, [user, authLoading, filters]); // Added filters to dependencies

	// Header with logo and sign-out button
	const renderHeader = () => (
		<header className="flex justify-between items-center mb-8">
			<div className="flex items-center space-x-2">
				<img src="logo.png" alt="InsureDash Logo" className="h-8 w-8" />
				<span className="text-xl font-bold text-gray-800">InsureDash</span>
			</div>
			<button
				type="button"
				onClick={signOut}
				className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
			>
				Sign Out
			</button>
		</header>
	);

	// Filter controls
	const renderFilters = () => (
		<div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row gap-4 mb-6">
			<div className="flex-1">
				<label
					htmlFor="status"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Status
				</label>
				<select
					id="status"
					name="status"
					value={filters.status}
					onChange={(e) =>
						setFilters((prev) => ({ ...prev, status: e.target.value }))
					}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
				>
					<option value="">All Statuses</option>
					<option value="active">Active</option>
					<option value="lapsed">Lapsed</option>
					<option value="cancelled">Cancelled</option>
				</select>
			</div>
			<div className="flex-1">
				<label
					htmlFor="type"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Policy Type
				</label>
				<select
					id="type"
					name="type"
					value={filters.type}
					onChange={(e) =>
						setFilters((prev) => ({ ...prev, type: e.target.value }))
					}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
				>
					<option value="">All Types</option>
					<option value="auto">Auto</option>
					<option value="home">Home</option>
					<option value="life">Life</option>
					<option value="health">Health</option>
				</select>
			</div>
		</div>
	);

	if (authLoading || loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col justify-center items-center h-screen text-red-500">
				<p>{error}</p>
				<button
					onClick={() => window.location.reload()}
					className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
				>
					Retry
				</button>
			</div>
		);
	}

	if (policies.length === 0) {
		return (
			<div className="flex flex-col justify-center items-center h-screen text-gray-500">
				<p>No policies found</p>
				<p className="text-sm mt-2">Try creating one or check your filters</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			{renderHeader()}
			{renderFilters()}

			<main className="space-y-10">
				{/* Policy Count by Type/Status */}
				<section>
					<h2 className="text-xl font-semibold mb-4">
						Policy Distribution by Type & Status
					</h2>
					<PolicyTypeStatusChart policies={policies} />
				</section>

				{/* Coverage Over Time */}
				<section>
					<h2 className="text-xl font-semibold mb-4">Coverage Over Time</h2>
					<CoverageOverTimeChart policies={policies} />
				</section>

				{/* Policy Distribution by Type */}
				<section>
					<h2 className="text-xl font-semibold mb-4">
						Policy Type Distribution
					</h2>
					<PolicyTypePieChart policies={policies} />
				</section>
			</main>
		</div>
	);
}
