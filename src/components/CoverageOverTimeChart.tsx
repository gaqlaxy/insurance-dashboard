import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Policy {
  id: string;
  coverage_amount: number;
  start_date: string;
}

export const CoverageOverTimeChart = ({ policies }: { policies: Policy[] }) => {
  const chartData = policies
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
    .map((policy, index) => ({
      name: `Policy ${index + 1}`,
      coverage: policy.coverage_amount,
      date: new Date(policy.start_date).toLocaleDateString(),
    }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="coverage" stroke="#3B82F6" />
      </LineChart>
    </ResponsiveContainer>
  );
};