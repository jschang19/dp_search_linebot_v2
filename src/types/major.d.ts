
type CacMajor = {
	key: string;
	fullName: string;
	numRecruit: string;
	numReview: string;
	numOutlying: string;
	date: string;
	url: string;
	university: string;
};


type StarMajor = {
	key: string;
	fullName: string;
	numRecruit: string;
	numExtra: string;
	numChoice: string;
	numExtraChoice: string;
	field: string;
	url: string;
	university: string;
};


type UacMajor = {
	key: string;
	fullName: string;
	orders: string[];
	referScore: string;
	englishListening: string;
	url: string;
	lastYearScore: string;
	university: string;
};

type BaseRawMajor = {
	full_name: string;
	key: string;
	university_code: string;
	view_count: number;
	universities: {
		full_name: string;
	};
  };  

  type RawCacMajor = BaseRawMajor & {
	aboriginal: string;
	expected_candidate: number;
	fee: number;
	gender_requirement: string;
	has_exam: string;
	outlying: string;
	recruit: number;
	review_date: string;
	support_measure: string;
	type: string;
	url: string;
	vision: string;
  };
  
  type RawStarMajor = BaseRawMajor & {
	additional_quota_allowed: string;
	group: string;
	additional_recruit: string;
	quota_allowed: string;
	recruit: string;
	url: string;
  };
  
  type RawUacMajor = BaseRawMajor & {
	ceec_test: string;
	english_listening: string;
	last_year: string;
	order1: string;
	order2: string;
	order3: string;
	order4: string;
	order5: string;
	redirect_url: string;
  };
  

type ModeOptions = "cac" | "star" | "uac";
type SearchColumn = "full_name" | "university_code" | "key";

type StarRegulation = {
	university_code: string;
	rank: string;
	transfer_rule: string;
};

export type {
	BaseRawMajor,
	CacMajor,
	StarMajor,
	RawStarMajor,
	UacMajor,
	RawUacMajor,
	ModeOptions,
	RawCacMajor,
	StarRegulation,
	SearchColumn,
};
