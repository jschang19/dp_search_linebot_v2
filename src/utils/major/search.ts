import { University } from "@/types/university";
import {
	BaseRawMajor,
	CacMajor,
	StarMajor,
	RawStarMajor,
	UacMajor,
	RawUacMajor,
	ModeOptions,
	RawCacMajor,
	StarRegulation,
} from "@/types/major";
import readCSV from "@/utils/readCsv";
import fs from "fs";
import supabase from "@/utils/supabase/createClient";

export const searchInfo = async ({
	universityCode,
	major,
	searchMode,
}: {
	universityCode: string;
	major: string;
	searchMode: ModeOptions;
}) => {
	const allMajors = await getAllMajors(searchMode, universityCode);

	// 这里可以根据实际情况添加类型检查
    if (!Array.isArray(allMajors) || allMajors.length === 0) {
        return [];
    }

	const results = filterMajors(allMajors, major);

	if (searchMode === "cac") {
		return parseCacMajorInfo(results as RawCacMajor[]);
	}
	if (searchMode === "star") {
		return parseStarMajorInfo(results as RawStarMajor[]);
	}
	if (searchMode === "uac") {
		return parseUacMajorInfo(results as RawUacMajor[]);
	}
	return [];
};

export const getUniversityCode = async (university: string): Promise<string | null> => {
	const results = (await readCSV("./data/code.csv")) as University[];
	const { code } = results.find(({ search_word }) => search_word.includes(university)) || {};
	return code || null;
};

export async function getAllMajors(searchMode: ModeOptions, universityCode: string) {
	// open csv file with universityCode
	// then parse the csv file to get the major info
	switch (searchMode) {
		case "cac":{
			const { data } = await supabase.from('cac_majors').select("*, universities(full_name)").eq('university_code', universityCode);
			return data as RawCacMajor[];
		}
		case "star":{
			const { data } = await supabase.from('star_majors').select("*, universities(full_name)").eq('university_code', universityCode);
			return data as RawStarMajor[];
		}
		case "uac":{
			const { data } = await supabase.from('uac_majors').select("*, universities(full_name)").eq('university_code', universityCode);
			return data as RawUacMajor[];
		}
	}
}

export async function getStarRegulation(universityCode: string): Promise<StarRegulation> {
	const { data, error } = await supabase.from("star_rules").select("*").eq("university_code", universityCode).maybeSingle();
	if(error){
		console.error("Error fetching star regulation:", error);
		throw error;
	}
	if(!data){
		console.error("Error fetching star regulation: no data");
		throw new Error("Error fetching star regulation: no data");
	}
	return data;
}

export function parseSavedMajor (saved: RawCacMajor[] | RawStarMajor[] | RawUacMajor[], type: ModeOptions) {
	// Return early if there are no saved majors.
	if (!saved.length) return [];

	try {
		if( type === "cac"){
			return parseCacMajorInfo(saved as RawCacMajor[])
		}
		else if( type === "star"){
			return parseStarMajorInfo(saved as RawStarMajor[])
		}
		else if ( type === "uac"){
			return parseUacMajorInfo(saved as RawUacMajor[])
		}
		else{
			return [];
		}
	} catch (error) {
		console.error("Error fetching saved majors:", error);
		return [];
	}
}

function filterMajors(
    allMajors: BaseRawMajor[],
    major: string
) {
    if (!allMajors || !major) {
        throw new Error("allMajors and major are required");
    }
    const regexMatched = searchWithRegex(allMajors, major);
    return regexMatched || [];
}

// 函数实现
function searchWithRegex<T extends BaseRawMajor>(
    allMajors: T[],
    query: string, 
) {
    const regexPattern = query.split("").join(".*?");
    const regex = new RegExp(regexPattern, "i");  // 'i' 标志表示忽略大小写

    return allMajors.filter((major) => {
        return regex.test(major.full_name as string);
    })
}

const parseCacMajorInfo = (results: RawCacMajor[]): CacMajor[] => {
	return results.map((r) => {
		return {
			university: r.university_code!,
			key: r.key!,
			fullName: r.universities.full_name! + r.full_name!,
			numRecruit: String(r.recruit!),
			numReview: String(r.expected_candidate!),
			numOutlying: r.outlying!,
			date: r.review_date!,
			url: r.url!,
		};
	});
};

const parseStarMajorInfo = (results: RawStarMajor[]): StarMajor[] => {
	return results.map((r) => {
		return {
			university: r.university_code!,
			key: r.key!,
			fullName: r.universities.full_name! + r.full_name!,
			numRecruit: r.recruit!,
			numExtra: r.additional_quota_allowed!,
			field: r.group!,
			numChoice: r.quota_allowed!,
			numExtraChoice: r.additional_quota_allowed!,
			url: r.url!,
		};
	});
};

const parseUacMajorInfo = (results: RawUacMajor[]): UacMajor[] => {
	return results.map((r) => {
		return {
			university: r.university_code!,
			key: r.key!,
			fullName: r.universities.full_name! + r.full_name!,
			orders: [r.order1!, r.order2!, r.order3!, r.order4!, r.order5!],
			referScore: r.ceec_test!,
			englishListening: r.english_listening!,
			url: r.redirect_url!,
			lastYearScore: r.last_year!,
		};
	});
};
