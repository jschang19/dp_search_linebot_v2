import supabase from "@utils/supabase/createClient";

async function getPreferenceMode(userId: string) {
	const { data, error } = await supabase.from("line_user_preferences").select("mode").eq("line_id", userId);

	if (error) {
		console.log("error: ", error);
		throw error;
	}

	return data[0]?.mode ?? null;
}

async function updatePreferenceMode(userId: string, newMode: string) {
	const { data, error } = await supabase
		.from("line_user_preferences")
		.upsert({
			line_id: userId,
			mode: newMode,
		})
		.select("*");

	if (error) {
		throw error;
	}

	return data;
}

export { getPreferenceMode, updatePreferenceMode };
