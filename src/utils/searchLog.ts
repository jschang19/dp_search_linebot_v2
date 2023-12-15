import { ModeOptions } from "@/types/major";
import supabase from "./supabase/createClient";

export default async function addSearchLog(
	userId: string,
	searchMode: ModeOptions,
	searchKeyword: string,
	majorKeys: string[]
) {
	const { error } = await supabase.from("line_search_log").insert([
		{
			line_id: userId,
			type: searchMode,
			keyword: searchKeyword,
			major_Keys: majorKeys.length > 0 ? majorKeys : null,
		},
	]);

	if (error) {
		console.log("error", error);
		throw error;
	}
}
