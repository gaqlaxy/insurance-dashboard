import React, { useState, useEffect } from "react";
import { fetchUsers, assignAgent } from "../services/userService";

export default function AdminPanel() {
	const [users, setUsers] = useState<any[]>([]);
	const [agents, setAgents] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadUsers = async () => {
			try {
				const data = await fetchUsers();
				setUsers(data);
				setAgents(data.filter((u) => u.role === "agent"));
			} catch (err) {
				console.error("Failed to load users:", err);
			} finally {
				setLoading(false);
			}
		};
		loadUsers();
	}, []);

	const handleAgentChange = async (userId: string, agentId: string | null) => {
		try {
			await assignAgent(userId, agentId);
			setUsers((prev) =>
				prev.map((u) => (u.id === userId ? { ...u, agent_id: agentId } : u)),
			);
		} catch (err) {
			alert("Failed to assign agent");
		}
	};

	if (loading) {
		return <div className="p-6">Loading users...</div>;
	}

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">User Management</h1>
			<div className="bg-white shadow overflow-hidden rounded-lg">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Email
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Role
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Assign Agent
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{users.map((user) => (
							<tr key={user.id}>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{user.email}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{user.role}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{user.role === "policy_holder" ? (
										<select
											value={user.agent_id || ""}
											onChange={(e) =>
												handleAgentChange(user.id, e.target.value || null)
											}
											className="border rounded p-1"
										>
											<option value="">Unassigned</option>
											{agents.map((agent) => (
												<option key={agent.id} value={agent.id}>
													{agent.email}
												</option>
											))}
										</select>
									) : (
										"N/A"
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{users.length === 0 && (
					<p className="p-4 text-center text-gray-500">No users found</p>
				)}
			</div>
		</div>
	);
}
