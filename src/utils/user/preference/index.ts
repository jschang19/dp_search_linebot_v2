import supabase from "@utils/supabase/createClient";
import { ModeOptions } from "@/types/major";

async function getPreferenceMode(userId: string): Promise<ModeOptions | null> {
	const { data, error } = await supabase.from("line_user_preferences").select("mode").eq("line_id", userId);

	if (error) {
		console.log("error: ", error);
		throw error;
	}

	return data[0]?.mode ?? null;
}

async function updatePreferenceMode(userId: string, newMode: ModeOptions) {
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
