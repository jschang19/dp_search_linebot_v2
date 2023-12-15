type UserProfile = {
	userId: string;
	searchMode: string;
	saved: SavedData[];
};

type SavedData = {
	universityCode: string;
	majorKey: string;
	type: 'cac' | 'star' | 'uac';
};

export type { UserProfile, SavedData };
