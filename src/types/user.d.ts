type UserProfile = {
	userId: string;
	searchMode: string;
	saved: SavedData[];
};

type SavedData = {
	universityId: string;
	majorId: string;
	type: string;
};

export type { UserProfile, SavedData };
