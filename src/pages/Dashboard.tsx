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
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const { user, loading: authLoading, signOut } = useAuth();

  // Load policies
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
  }, [user, authLoading, filters]);

  // Close modal on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPolicy(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close modal on click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedPolicy(null);
    }
  };

  // Header
  const renderHeader = () => (
    <header className="flex justify-between items-center mb-8">
      <div className="flex items-center space-x-2">
        <img src="logo.png" alt="InsureDash Logo" className="h-8 w-8" />
        <span className="text-xl font-bold text-gray-800">InsureDash</span>
		
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">{user?.email}</span>
        <button
          type="button"
          onClick={signOut}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </header>
  );

  // Filters
  const renderFilters = () => (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
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
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
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

  // Policy Card Grid
  const renderPolicyGrid = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {policies.map((policy) => (
        <div
          key={policy.id}
          onClick={() => setSelectedPolicy(policy)}
          className="bg-white p-5 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800">{policy.policy_number}</h3>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                policy.status === "active"
                  ? "bg-green-100 text-green-800"
                  : policy.status === "lapsed"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
            </span>
          </div>
          <div className="mt-3 space-y-1">
            <p className="text-sm text-gray-600">
              Type: <span className="font-medium">{policy.type}</span>
            </p>
            <p className="text-sm text-gray-600">
              Coverage:{" "}
              <span className="font-medium">${policy.coverage_amount.toLocaleString()}</span>
            </p>
            <p className="text-sm text-gray-600">
              Valid:{" "}
              <span className="font-medium">
                {new Date(policy.start_date).toLocaleDateString()} -{" "}
                {new Date(policy.end_date).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  // Policy Detail Modal
  const renderPolicyModal = () => {
    if (!selectedPolicy) return null;

    return (
      <div
        className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-auto p-6 relative">
          <button
            onClick={() => setSelectedPolicy(null)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold mb-4">{selectedPolicy.policy_number}</h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Type:</strong> {selectedPolicy.type}
            </div>
            <div>
              <strong>Status:</strong> {selectedPolicy.status}
            </div>
            <div>
              <strong>Coverage:</strong> ${selectedPolicy.coverage_amount.toLocaleString()}
            </div>
            <div>
              <strong>Start Date:</strong>{" "}
              {new Date(selectedPolicy.start_date).toLocaleDateString()}
            </div>
            <div>
              <strong>End Date:</strong>{" "}
              {new Date(selectedPolicy.end_date).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    );
  };

const renderNoPoliciesModal = () => {
	if (policies.length > 0) return null;
  
	return (
	  <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
		<div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
		  <h2 className="text-xl font-bold text-gray-800 mb-2">No Policies Found</h2>
		  <p className="text-gray-600">
			You don’t have any policies yet.
		  </p>
		</div>
	  </div>
	);
  };

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {renderHeader()}
      {renderFilters()}

      <main className="space-y-10">
        {/* Policy List */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Your Policies</h2>
          {renderPolicyGrid()}
        </section>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <section className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              Policy Distribution by Type & Status
            </h2>
            <div className="h-64 w-full">
              <PolicyTypeStatusChart policies={policies} />
            </div>
          </section>

          <section className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Coverage Over Time</h2>
            <div className="h-64 w-full">
              <CoverageOverTimeChart policies={policies} />
            </div>
          </section>

          <section className="bg-white p-4 rounded-lg shadow md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Policy Type Distribution</h2>
            <div className="h-64 w-full">
              <PolicyTypePieChart policies={policies} />
            </div>
          </section>
        </div>

        {/* Modals */}
        {renderPolicyModal()}
        {renderNoPoliciesModal()}
      </main>
    </div>
  );
}