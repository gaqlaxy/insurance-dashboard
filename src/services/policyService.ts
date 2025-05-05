import { supabase } from "../supabaseClient";

export const fetchPolicies = async (
	userId: string,
	filters: Record<string, string> = {}
  ) => {
	if (!userId) {
	  console.error("No user ID provided");
	  return [];
	}
  
	let query = supabase.from("policies").select("*").eq("user_id", userId);
  
	if (filters.status) {
	  query = query.eq("status", filters.status);
	}
  
	if (filters.type) {
	  query = query.eq("type", filters.type);
	}
  
	const { data, error } = await query;
	if (error) throw error;
	return data || [];
  };
export const subscribeToPolicies = (callback: (payload: any) => void) => {
	supabase
		.channel("realtime-policies")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "policies" },
			callback,
		)
		.subscribe();
};
