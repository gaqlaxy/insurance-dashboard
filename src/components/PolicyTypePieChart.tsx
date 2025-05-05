// src/components/PolicyTypePieChart.tsx
import React from "react";
import { Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts";

interface Policy {
	id: string;
	type: string;
}

export const PolicyTypePieChart = ({ policies }: { policies: Policy[] }) => {
	// Count policies by type
	const chartData = [
		{
			name: "Auto",
			value: policies.filter((p) => p.type === "auto").length,
		},
		{
			name: "Home",
			value: policies.filter((p) => p.type === "home").length,
		},
		{
			name: "Life",
			value: policies.filter((p) => p.type === "life").length,
		},
		{
			name: "Health",
			value: policies.filter((p) => p.type === "health").length,
		},
	];

	return (
		<div className="h-80">
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Tooltip />
					<Pie data={chartData} dataKey="value" nameKey="name" fill="#3B82F6" />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};
