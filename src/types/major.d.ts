type CacMajor = {
	code: string;
	fullName: string;
	numRecruit: string;
	numReview: string;
	numIsland: string;
	date: string;
	url: string;
	unewsUrl: string;
	university?: string;
};

type StarMajor = {
	code: string;
	fullName: string;
	numRecruit: string;
	numExtra: string;
	numChoice: string;
	numExtraChoice: string;
	field: string;
	url: string;
	unewsUrl: string;
	university?: string;
};

type UacMajor = {
	code: string;
	fullName: string;
	orders: string[];
	referScore: string;
	englishListening: string;
	url: string;
	lastYearScore: string;
	university?: string;
};

type rawMajor = {
	university: string;
	[keyof: string]: string;
};

type rawCacMajor = {
	校系代碼: string;
	招生名額: string;
	預計甄試人數: string;
	離島外加名額: string;
	指定項目甄試日期?: string;
	科系校系分則網址: string;
	大學問網址: string;
	校系分則詳細資料: string;
} & rawMajor;

type rawStarMajor = {
	校系名稱及代碼: string;
	招生名額: string;
	外加名額: string;
	學群類別: string;
	招生名額各學群可選填志願數: string;
	外加名額各學群可選填志願數: string;
	校系分則詳細資料?: string;
	大學問網址: string;
} & rawMajor;

type rawUacMajor = {
	校系名稱: string;
	校系代碼: string;
	"順序 1": string;
	"順序 2": string;
	"順序 3": string;
	"順序 4": string;
	"順序 5": string;
	學測採計: string;
	英聽: string;
	校系分則: string;
	去年分數: string;
} & rawMajor;

type ModeOptions = "cac" | "star" | "uac";

export type { CacMajor, rawMajor, StarMajor, rawStarMajor, UacMajor, rawUacMajor, ModeOptions, rawCacMajor };
