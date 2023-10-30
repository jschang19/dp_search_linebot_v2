import { TextMessage, FlexBubble, FlexMessage } from "@line/bot-sdk";
import { Major } from "@/types/major";

export function TextMessage(text: string): TextMessage {
	if (!text) throw new Error("text is empty");
	else if (text.length > 2000) throw new Error("text is too long");

	return {
		type: "text",
		text,
	};
}

export function ResultMessage(university: string, extractedResults: Major[]): FlexMessage {
	const bubbles: FlexBubble[] = extractedResults.map((result: Major, index) => {
		const { fullName, numRecruit, numReview, numIsland, date, url, unewsUrl } = result;
		return {
			type: "bubble",
			size: "mega",
			body: {
				type: "box",
				layout: "vertical",
				contents: [
					{
						type: "text",
						text: "🔎 科系查詢結果 " + String(index + 1),
						weight: "bold",
						size: "xl",
						color: "#000000",
					},
					{
						type: "box",
						layout: "vertical",
						margin: "lg",
						spacing: "sm",
						contents: [
							{
								type: "box",
								layout: "baseline",
								spacing: "sm",
								contents: [
									{
										type: "text",
										text: "科系名稱 ",
										color: "#aaaaaa",
										size: "sm",
										flex: 4,
									},
									{
										type: "text",
										text: fullName,
										wrap: true,
										color: "#000000",
										size: "sm",
										flex: 5,
										weight: "bold",
									},
								],
							},
							{
								type: "box",
								layout: "baseline",
								spacing: "sm",
								contents: [
									{
										type: "text",
										text: "招生名額",
										color: "#aaaaaa",
										size: "sm",
										flex: 4,
									},
									{
										type: "text",
										text: numRecruit,
										wrap: true,
										color: "#666666",
										size: "sm",
										flex: 5,
									},
								],
								margin: "lg",
							},
							{
								type: "box",
								layout: "baseline",
								spacing: "sm",
								contents: [
									{
										type: "text",
										text: "預計甄試人數",
										color: "#aaaaaa",
										size: "sm",
										flex: 4,
									},
									{
										type: "text",
										text: numReview,
										wrap: true,
										color: "#666666",
										size: "sm",
										flex: 5,
									},
								],
								margin: "lg",
							},
							{
								type: "box",
								layout: "baseline",
								spacing: "sm",
								contents: [
									{
										type: "text",
										text: "離島外加名額",
										color: "#aaaaaa",
										size: "sm",
										flex: 4,
									},
									{
										type: "text",
										text: numIsland,
										wrap: true,
										color: "#666666",
										size: "sm",
										flex: 5,
									},
								],
								margin: "lg",
							},
							{
								type: "box",
								layout: "baseline",
								spacing: "sm",
								contents: [
									{
										type: "text",
										text: "甄試日期",
										color: "#aaaaaa",
										size: "sm",
										flex: 4,
									},
									{
										type: "text",
										text: date,
										wrap: true,
										color: "#666666",
										size: "sm",
										flex: 5,
									},
								],
								margin: "lg",
							},
						],
					},
				],
			},
			footer: {
				type: "box",
				layout: "vertical",
				spacing: "sm",
				contents: [
					{
						type: "button",
						style: "link",
						height: "sm",
						color: "#1590fe",
						action: {
							type: "uri",
							label: "查看校系分則",
							uri: url,
						},
						margin: "md",
					},
					{
						type: "button",
						style: "link",
						height: "sm",
						color: "#1590fe",
						action: {
							type: "uri",
							label: "學習歷程參採項目",
							uri: "https://google.com", //setPortfolioURL(name)
						},
						margin: "sm",
					},
					{
						type: "button",
						style: "link",
						height: "sm",
						color: "#1590fe",
						action: {
							type: "uri",
							label: "去年錄取分數",
							uri: setUniversityTWURL("regular", fullName),
						},
						margin: "sm",
					},
					{
						type: "button",
						style: "link",
						height: "sm",
						color: "#1590fe",
						action: {
							type: "uri",
							label: "大學問連結",
							uri: unewsUrl,
						},
						margin: "md",
					},
					{
						type: "button",
						style: "secondary",
						height: "sm",
						action: {
							type: "uri",
							label: "加入行事曆",
							uri: "https://google.com", //setGoogleCalendarURLl(date, name)
						},
						margin: "md",
					},
					{
						type: "button",
						style: "primary",
						height: "sm",
						color: "#1590fe",
						action: {
							type: "postback",
							label: "收藏科系",
							data: "save-" + university + "-" + fullName,
							displayText: "加入個申收藏 - " + fullName,
						},
						margin: "md",
					},
				],
				flex: 0,
				margin: "md",
			},
		};
	});

	return {
		type: "flex",
		altText: "個人申請科系查詢結果",
		contents: {
			type: "carousel",
			contents: bubbles,
		},
	};
}

function setPortfolioURL(name: string) {
	const serial_num = name.match(/\d/g);
	if (!serial_num) throw new Error("serial_num is undefined");
	const joined_serial_num = serial_num.join("");
	const school_serial_num = joined_serial_num.substring(0, 3); // 學校代碼
	const url_param = name
		.replace("大學", "大學-")
		.replace(" ", "")
		.replace(`(${serial_num})`, "")
		.replace("APCS組", "")
		.replace("(資安組)", "");

	return encodeURI(
		`https://www.cac.edu.tw/cacportal/jbcrc/LearningPortfolios_MultiQuery_ppa/LPM_readfile_html.php?fileid=${school_serial_num}-${url_param}`
	);
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

function setGoogleCalendarURL(date: string, name: string): string {
	const { start, end } = parseDate(date);

	if (!start && !end) {
		return "https://calendar.google.com/calendar/u/0/r";
	}

	const eventTitle = `${name}二階甄試`;
	const eventDetails = `${name}二階面試的日期，準確時間請依照各校的正式面試簡章為主。`;
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

function setUniversityTWURL(type: string, name: string) {
	if (!type || !name) {
		throw new Error("setUniversityTW: type or name is undefined");
	}
	let serial_num = name.match(/\d/g);
	if (!serial_num) throw new Error("serial_num is undefined");
	let joined_serial_num = serial_num.join("");

	const school_serial_num = joined_serial_num.substring(0, 3); // 學校代碼
	switch (type) {
		case "regular":
			return encodeURI(`https://university-tw.ldkrsi.men/caac/${school_serial_num}/${serial_num}`);
		case "star":
			return encodeURI(`https://university-tw.ldkrsi.men/star/${school_serial_num}/${serial_num}`);
		default:
			return encodeURI("https://university-tw.ldkrsi.men/");
	}
}
