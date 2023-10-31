import supabase from "@utils/supabase/createClient";
import { SavedData } from "@/types/user";

async function getSave(userId: string, type: string) {
	const { data, error } = await supabase
		.from("line_user_savelists")
		.select("university_id, major_id")
		.eq("line_id", userId)
		.eq("type", type);

	if (error) {
		throw error;
	}

	return data.map((saved) => {
		{
			return {
				majorId: saved.major_id,
				universityId: saved.university_id,
			};
		}
	});
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

export { getSave, addSave, unSave, checkHasSaved, checkExceedLimit };
