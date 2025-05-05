// src/components/PolicyTypeStatusChart.tsx
import React from "react";
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface Policy {
	id: string;
	type: string;
	status: string;
}

export const PolicyTypeStatusChart = ({ policies }: { policies: Policy[] }) => {
	// Group policies by status and type
	const chartData = [
		{
			name: "Active",
			auto: policies.filter((p) => p.type === "auto" && p.status === "active")
				.length,
			home: policies.filter((p) => p.type === "home" && p.status === "active")
				.length,
			life: policies.filter((p) => p.type === "life" && p.status === "active")
				.length,
			health: policies.filter(
				(p) => p.type === "health" && p.status === "active",
			).length,
		},
		{
			name: "Lapsed",
			auto: policies.filter((p) => p.type === "auto" && p.status === "lapsed")
				.length,
			home: policies.filter((p) => p.type === "home" && p.status === "lapsed")
				.length,
			life: policies.filter((p) => p.type === "life" && p.status === "lapsed")
				.length,
			health: policies.filter(
				(p) => p.type === "health" && p.status === "lapsed",
			).length,
		},
		{
			name: "Cancelled",
			auto: policies.filter(
				(p) => p.type === "auto" && p.status === "cancelled",
			).length,
			home: policies.filter(
				(p) => p.type === "home" && p.status === "cancelled",
			).length,
			life: policies.filter(
				(p) => p.type === "life" && p.status === "cancelled",
			).length,
			health: policies.filter(
				(p) => p.type === "health" && p.status === "cancelled",
			).length,
		},
	];

	return (
		<div className="h-80">
			<BarChart width={600} height={300} data={chartData}>
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="auto" stackId="a" fill="#3B82F6" />
				<Bar dataKey="home" stackId="a" fill="#10B981" />
				<Bar dataKey="life" stackId="a" fill="#F59E0B" />
				<Bar dataKey="health" stackId="a" fill="#EF4444" />
			</BarChart>
		</div>
	);
};
