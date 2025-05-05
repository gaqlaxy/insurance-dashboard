import { supabase } from "../supabaseClient";

export const fetchUsers = async () => {
	const { data, error } = await supabase.from("users").select("*");
	if (error) throw error;
	return data;
};

export const assignAgent = async (userId: string, agentId: string | null) => {
	const { error } = await supabase
		.from("users")
		.update({ agent_id: agentId })
		.eq("id", userId);
	if (error) throw error;
};
