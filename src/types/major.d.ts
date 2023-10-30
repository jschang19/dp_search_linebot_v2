type Major = {
	fullName: string;
	numRecruit: string;
	numReview: string;
	numIsland: string;
	date: string;
	url: string;
	unewsUrl: string;
};

type StarMajor = {
	fullName: string;
	numRecruit: string;
	numExtra: string;
	numChoice: string;
	numExtraChoice: string;
	field: string;
	url: string;
	unewsUrl: string;
};

/**
 * fullName: result.item.校系名稱及代碼,
					numRecruit: result.item.招生名額,
					numExtra: result.item.外加名額,
					field: result.item.學群類別,
					numChoice: result.item.招生名額各學群可選填志願數,
					numExtraChoice: result.item.外加名額各學群可選填志願數,
					url: result.item.校系分則詳細資料,
					unewsUrl: result.item.大學問網址,
 */

type rawMajor = {
	校系名稱及代碼: string;
	招生名額: string;
	預計甄試人數: string;
	離島外加名額?: string;
	指定項目甄試日期?: string;
	科系校系分則網址: string;
	大學問網址: string;
	外加名額?: string;
	學群類別?: string;
	招生名額各學群可選填志願數?: string;
	外加名額各學群可選填志願數?: string;
	校系分則詳細資料?: string;
};

type rawStarMajor = {
	校系名稱及代碼: string;
	招生名額: string;
	外加名額?: string;
	學群類別?: string;
	招生名額各學群可選填志願數?: string;
	外加名額各學群可選填志願數?: string;
	校系分則詳細資料?: string;
	大學問網址: string;
};

export type { Major, rawMajor, StarMajor, rawStarMajor };
