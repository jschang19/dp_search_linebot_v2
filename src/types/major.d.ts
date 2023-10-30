type Major = {
	fullName: string;
	numRecruit: string;
	numReview: string;
	numIsland: string;
	date: string;
	url: string;
	unewsUrl: string;
};

type rawMajor = {
	校系名稱及代碼: string;
	招生名額: string;
	預計甄試人數: string;
	離島外加名額: string;
	指定項目甄試日期: string;
	科系校系分則網址: string;
	大學問網址: string;
};

export type { Major, rawMajor };
