import supabase from "@utils/supabase/createClient";
import { ModeOptions, RawCacMajor, RawStarMajor, RawUacMajor } from "@/types/major";
import { SavedData } from "@/types/user";

async function getSaveMajors(userId: string, type: ModeOptions){
	if( type === "cac"){
		const { data, error } = await supabase
			.from("line_user_savelists")
			.select("major_id, university_id, cac_majors(*)")
			.eq("line_id", userId)
			.eq("type", type);

		if (error) {
			throw error;
		}

		return data.map((item) => {
			return {
				...item.cac_majors,
			} 
		}) as unknown as RawCacMajor[];
	}

	else if( type === "star"){
		const { data, error } = await supabase
			.from("line_user_savelists")
			.select("major_id, university_id, star_majors(*)")
			.eq("line_id", userId)
			.eq("type", type);

		if (error) {
			throw error;
		}

		return data.map((item) => {
			return {
				...item.star_majors,
			};
		}) as unknown as RawStarMajor[];
	}

	else if ( type === "uac"){
		const { data, error } = await supabase
			.from("line_user_savelists")
			.select("major_id, university_id, uac_majors(*)")
			.eq("line_id", userId)
			.eq("type", type);

		if (error) {
			throw error;
		}

		return data.map((item) => {
			return {
				...item.uac_majors,
			};
		}) as unknown as RawUacMajor[];
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
