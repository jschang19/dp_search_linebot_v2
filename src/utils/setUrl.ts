function setPortfolioURL(fullName: string) {
	const serialNum = fullName.match(/\d/g);
	if (!serialNum) throw new Error("serialNum is undefined");
	const joinedSerialNum = serialNum.join("");
	const universitySerialNum = joinedSerialNum.substring(0, 3); // 學校代碼
	const urlParam = fullName
		.replace("大學", "大學-")
		.replace(" ", "")
		.replace(`(${joinedSerialNum})`, "")
		.replace("APCS組", "")
		.replace("(資安組)", "");

	const url = encodeURI(
		`https://www.cac.edu.tw/cacportal/jbcrc/LearningPortfolios_MultiQuery_ppa/LPM_readfile_html.php?fileid=${universitySerialNum}-${urlParam}`
	);

	return url;
}

type DateRange = {
	start: string;
	end: string;
};

function parseDate(date: string): DateRange {
	date = date.replaceAll(" ", "").replace("\n", "");

	let start = "";
	let end = "";

	if (date.includes("至") || date.includes("、")) {
		const delimiter = date.includes("至") ? "至" : "、";
		const [startDate, endDate] = date.split(delimiter);
		start = startDate.replaceAll(".", "").replaceAll("112", "2023");
		end = endDate.replaceAll(".", "").replaceAll("112", "2023");
	} else if (date === "--" || date === "無") {
		return { start: "", end: "" };
	} else {
		start = date.replaceAll(".", "").replaceAll("112", "2023");
		end = start;
	}

	return { start, end };
}

function setGoogleCalendarURL(date: string, eventName: string): string {
	const { start, end } = parseDate(date);

	if (!start && !end) {
		return "https://calendar.google.com/calendar/u/0/r";
	}

	const eventTitle = `${eventName}二階甄試`;
	const eventDetails = `${eventName}二階面試的日期，準確時間請依照各校的正式面試簡章為主。`;
	let calendarUrl = encodeURI(
		`https://calendar.google.com/calendar/u/0/render?action=TEMPLATE&dates=${start}T000000Z/${end}T090000Z&text=${eventTitle}&details=${eventDetails}`
	);

	if (calendarUrl.length > 1000) {
		calendarUrl = encodeURI(
			`https://calendar.google.com/calendar/u/0/render?action=TEMPLATE&dates=${start}T000000Z/${end}T090000Z&text=${eventTitle}`
		);
	}
	return calendarUrl;
}

function setUniversityTWURL(type: string, fullName: string) {
	if (!type || !fullName) {
		throw new Error("setUniversityTW: type or name is undefined");
	}
	const serialNum = fullName.match(/\d/g);
	if (!serialNum) throw new Error("serialNum is undefined");
	const joinedSerialNum = serialNum.join("");

	if (joinedSerialNum.length < 5) throw new Error("serialNum is too short");

	const universitySerialNum = joinedSerialNum.substring(0, 3); // 學校代碼
	switch (type) {
		case "cac":
			return encodeURI(`https://university-tw.ldkrsi.men/caac/${universitySerialNum}/${joinedSerialNum}`);
		case "star":
			return encodeURI(`https://university-tw.ldkrsi.men/star/${universitySerialNum}/${joinedSerialNum}`);
		default:
			return encodeURI("https://university-tw.ldkrsi.men/");
	}
}

export { setPortfolioURL, setGoogleCalendarURL, setUniversityTWURL };
