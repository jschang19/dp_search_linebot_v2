import supabase from "@utils/supabase/createClient";
import { ModeOptions, RawCacMajor, RawStarMajor, RawUacMajor } from "@/types/major";
import { SavedData } from "@/types/user";

async function getSaveMajors(userId: string, type: ModeOptions){
	if( type === "cac"){
		const { data: saved_ids, error } = await supabase
			.from("line_user_savelists")
			.select("major_id")
			.eq("line_id", userId)
			.eq("type", type);

		if (error) {
			throw error;
		}

		const { data } = await supabase.from('cac_majors').select("*, universities(full_name)").in("key", saved_ids.map((saved) => saved.major_id));
		return data as unknown as RawCacMajor[];
	}

	else if( type === "star"){
		const { data: saved_ids, error } = await supabase
			.from("line_user_savelists")
			.select("major_id")
			.eq("line_id", userId)
			.eq("type", type);

		if (error) {
			throw error;
		}

		const { data } = await supabase.from('star_majors').select("*, universities(full_name)").in("key", saved_ids.map((saved) => saved.major_id));
		return data as unknown as RawStarMajor[];
	}

	else if ( type === "uac"){
		const { data: saved_ids, error } = await supabase
			.from("line_user_savelists")
			.select("major_id, university_id")
			.eq("line_id", userId)
			.eq("type", type);

		if (error) {
			throw error;
		}

		const { data } = await supabase.from('uac_majors').select("*, universities(full_name)").in("key", saved_ids.map((saved) => saved.major_id));
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
			major_id: saveData.majorId,
			university_id: saveData.universityId,
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
		.eq("major_id", saveData.majorId);

	if (error) {
		throw error;
	}

	return data;
}

async function checkHasSaved(userId: string, majorId: string) {
	const { data, error } = await supabase
		.from("line_user_savelists")
		.select("university_id, major_id")
		.eq("line_id", userId)
		.eq("major_id", majorId);

	if (error) {
		throw error;
	}

	return data && data.length > 0;
}

async function checkExceedLimit(userId: string) {
	const { data, error } = await supabase
		.from("line_user_savelists")
		.select("university_id, major_id")
		.eq("line_id", userId);

	if (error) {
		throw error;
	}

	return data && data.length >= 10;
}

export { getSaveMajors, addSave, unSave, checkHasSaved, checkExceedLimit };
