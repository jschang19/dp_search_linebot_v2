import supabase from "@utils/supabase/createClient";
import { ModeOptions, RawCacMajor, RawStarMajor, RawUacMajor } from "@/types/major";
import { SavedData } from "@/types/user";

async function getSaveMajors(userId: string, type: ModeOptions){
	if( type === "cac"){
		const { data: saved_ids, error } = await supabase
			.from("line_user_savelists")
			.select("major_key")
			.eq("line_id", userId)
			.eq("type", type);

		if (error) {
			throw error;
		}

		const { data } = await supabase.from('cac_majors').select("*, universities(full_name)").in("key", saved_ids.map((saved) => saved.major_key));
		return data as unknown as RawCacMajor[];
	}

	else if( type === "star"){
		const { data: saved_ids, error } = await supabase
			.from("line_user_savelists")
			.select("major_key")
			.eq("line_id", userId)
			.eq("type", type);

		if (error) {
			throw error;
		}

		const { data } = await supabase.from('star_majors').select("*, universities(full_name)").in("key", saved_ids.map((saved) => saved.major_key));
		return data as unknown as RawStarMajor[];
	}

	else if ( type === "uac"){
		const { data: saved_ids, error } = await supabase
			.from("line_user_savelists")
			.select("major_key")
			.eq("line_id", userId)
			.eq("type", type);

		if (error) {
			throw error;
		}

		const { data } = await supabase.from('uac_majors').select("*, universities(full_name)").in("key", saved_ids.map((saved) => saved.major_key));
		return data as unknown as RawUacMajor[];
	}

	else{
		return [];
	}
}

async function addSave(userId: string, saveData: SavedData) {
	const { data, error } = await supabase
		.from("line_user_savelists")
		.upsert({
			line_id: userId,
			major_key: saveData.majorKey,
			university_code: saveData.universityCode,
			type: saveData.type,
		})
		.select("*");

	if (error) {
		throw error;
	}

	return data;
}

async function unSave(userId: string, saveData: SavedData) {
	const { data, error } = await supabase
		.from("line_user_savelists")
		.delete()
		.eq("line_id", userId)
		.eq("major_key", saveData.majorKey);

	if (error) {
		throw error;
	}

	return data;
}

async function checkHasSaved(userId: string, majorKey: string) {
	const { data, error } = await supabase
		.from("line_user_savelists")
		.select("university_code, major_key")
		.eq("line_id", userId)
		.eq("major_key", majorKey);

	if (error) {
		throw error;
	}

	return data && data.length > 0;
}

async function checkExceedLimit(userId: string) {
	const { data, error } = await supabase
		.from("line_user_savelists")
		.select("university_code, major_key")
		.eq("line_id", userId);

	if (error) {
		throw error;
	}

	return data && data.length >= 10;
}

export { getSaveMajors, addSave, unSave, checkHasSaved, checkExceedLimit };
