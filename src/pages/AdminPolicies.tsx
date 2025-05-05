// src/pages/AdminPolicies.tsx
import React, { useState, useEffect } from "react";
import { fetchPolicies } from "../services/policyService";
import { useAuth } from "../context/AuthContext";

export default function AdminPolicies() {
	const [policies, setPolicies] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [filters, setFilters] = useState({
		status: "",
		type: "",
	});

	const { user, role } = useAuth();

	useEffect(() => {
		const loadPolicies = async () => {
			if (role !== "admin") return;

			const data = await fetchPolicies("admin", user.id, {
				...(filters.status && { status: filters.status }),
				...(filters.type && { type: filters.type }),
			});

			setPolicies(data || []);
			setLoading(false);
		};

		loadPolicies();
	}, [user, role, filters]);

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFilters((prev) => ({ ...prev, [name]: value }));
	};

	if (role !== "admin") return <div>Unauthorized</div>;
	if (loading) return <div>Loading...</div>;

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">All Policies</h1>

			{/* Filters */}
			<div className="flex gap-4 mb-6">
				<select
					name="status"
					value={filters.status}
					onChange={handleFilterChange}
					className="border rounded p-2"
				>
					<option value="">All Statuses</option>
					<option value="active">Active</option>
					<option value="lapsed">Lapsed</option>
					<option value="cancelled">Cancelled</option>
				</select>

				<select
					name="type"
					value={filters.type}
					onChange={handleFilterChange}
					className="border rounded p-2"
				>
					<option value="">All Types</option>
					<option value="auto">Auto</option>
					<option value="home">Home</option>
					<option value="life">Life</option>
					<option value="health">Health</option>
				</select>
			</div>

			{/* Policy Table */}
			<div className="bg-white shadow overflow-hidden rounded-lg">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Policy Number
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Type
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Coverage
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Status
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Policy Holder
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Agent
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{policies.length === 0 && (
							<tr>
								<td colSpan={6} className="px-6 py-4 text-center text-gray-500">
									No policies found
								</td>
							</tr>
						)}
						{policies.map((policy) => (
							<tr key={policy.id}>
								<td className="px-6 py-4 text-sm text-gray-900">
									{policy.policy_number}
								</td>
								<td className="px-6 py-4 text-sm text-gray-500">
									{policy.type}
								</td>
								<td className="px-6 py-4 text-sm text-gray-500">
									${policy.coverage_amount.toLocaleString()}
								</td>
								<td className="px-6 py-4 text-sm">
									<span
										className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
											policy.status === "active"
												? "bg-green-100 text-green-800"
												: policy.status === "lapsed"
													? "bg-yellow-100 text-yellow-800"
													: "bg-red-100 text-red-800"
										}`}
									>
										{policy.status}
									</span>
								</td>
								<td className="px-6 py-4 text-sm text-gray-500">
									{policy.user_id}
								</td>
								<td className="px-6 py-4 text-sm text-gray-500">
									{policy.agent_id || "None"}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
