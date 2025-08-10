import { FlexBubble, FlexMessage } from "@line/bot-sdk";
import { CacMajor, StarMajor, UacMajor } from "@/types/major";
import { setGoogleCalendarURL, setUniversityTWURL } from "@/utils/setUrl";
import { ColorScheme } from "@/config";

export function ResultMessage(extractedResults: CacMajor[], isSaved: boolean = false): FlexMessage {
	const bubbles: FlexBubble[] = extractedResults.map((result: CacMajor, index) => {
		const { university, key, fullName, numRecruit, numReview, numOutlying, date, url, portfolioGuideUrl } = result;

		return {
			type: "bubble",
			size: "mega",
			body: {
				type: "box",
				layout: "vertical",
				contents: [
					{
						type: "text",
						text: isSaved ? "個申收藏校系" : "校系查詢結果 " + String(index + 1),
						weight: "bold",
						size: "lg",
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
										text: "校系名稱 ",
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
										text: numOutlying,
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
						color: ColorScheme.primary,
						action: {
							type: "uri",
							label: "查看校系分則",
							uri: url,
						},
						margin: "sm",
					},
					{
						type: "button",
						style: "link",
						height: "sm",
						color: ColorScheme.primary,
						action: {
							type: "uri",
							label: "審查資料準備指引",
							uri: portfolioGuideUrl ?? "https://www.cac.edu.tw/apply114/guide.php"
						},
						margin: "sm",
					},
					{
						type: "button",
						style: "link",
						height: "sm",
						color: ColorScheme.primary,
						action: {
							type: "uri",
							label: "去年錄取分數",
							uri: setUniversityTWURL("cac", fullName,  key),
						},
						margin: "sm",
					},
					{
						type: "button",
						style: "secondary",
						height: "sm",
						action: {
							type: "uri",
							label: "加入行事曆",
							uri: setGoogleCalendarURL(date, fullName),
						},
						margin: "md",
					},
					isSaved
						? {
								type: "button",
								style: "secondary",
								height: "sm",
								action: {
									type: "postback",
									label: "取消收藏",
									data: "unsave-cac-" + university + "-" + key,
									displayText: "取消個申收藏 - " + fullName,
								},
								margin: "md",
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  }
						: {
								type: "button",
								style: "primary",
								height: "sm",
								color: ColorScheme.primary,
								action: {
									type: "postback",
									label: "收藏校系",
									data: "save-cac-" + university + "-" + key,
									displayText: "加入個申收藏 - " + fullName,
								},
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  },
				],
				flex: 0,
				margin: "md",
			},
		};
	});

	return {
		type: "flex",
		altText: "個人申請校系查詢結果",
		contents: {
			type: "carousel",
			contents: bubbles,
		},
	};
}

export function StarResultMessage(extractedResults: StarMajor[], isSaved: boolean = false): FlexMessage {
	const bubbles: FlexBubble[] = extractedResults.map((result: StarMajor, index) => {
		const { university, key, fullName, numRecruit, numExtra, field, numChoice, numExtraChoice, url } =
			result;
		return {
			type: "bubble",
			size: "mega",
			body: {
				type: "box",
				layout: "vertical",
				contents: [
					{
						type: "text",
						text: isSaved ? "繁星校系收藏" : `🔎 繁星查詢結果 ${index + 1}`,
						weight: "bold",
						size: "lg",
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
										text: "校系名稱",
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
										text: "外加名額",
										color: "#aaaaaa",
										size: "sm",
										flex: 4,
									},
									{
										type: "text",
										text: numExtra,
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
										text: "學群類別",
										color: "#aaaaaa",
										size: "sm",
										flex: 4,
									},
									{
										type: "text",
										text: field,
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
										text: "各學群可選填\n志願數",
										color: "#aaaaaa",
										size: "sm",
										flex: 4,
										wrap: true,
									},
									{
										type: "text",
										text: numChoice,
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
										text: "外加名額各學群\n可選填志願數",
										color: "#aaaaaa",
										wrap: true,
										size: "sm",
										flex: 4,
									},
									{
										type: "text",
										text: numExtraChoice,
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
						color: ColorScheme.primary,
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
						color: ColorScheme.primary,
						action: {
							type: "uri",
							label: "去年錄取分數",
							uri: setUniversityTWURL("star", fullName,  key),
						},
						margin: "sm",
					},
					isSaved
						? {
								type: "button",
								style: "secondary",
								height: "sm",
								action: {
									type: "postback",
									label: "取消收藏",
									displayText: "取消繁星收藏 - " + fullName,
									data: "unsave-star-" + university + "-" + key,
								},
								margin: "md",
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  }
						: {
								type: "button",
								style: "primary",
								height: "sm",
								color: ColorScheme.primary,
								action: {
									type: "postback",
									label: "收藏校系",
									displayText: "加入繁星收藏 - " + fullName,
									data: "save-star-" + university + "-" + key,
								},
								margin: "md",
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  },
				],
				flex: 0,
				margin: "md",
			},
		};
	});

	return {
		type: "flex",
		altText: "繁星校系查詢結果",
		contents: {
			type: "carousel",
			contents: bubbles,
		},
	};
}

export function UacResultMessage(extractedResults: UacMajor[], isSaved: boolean = false): FlexMessage {
	const bubbles: FlexBubble[] = extractedResults.map((result: UacMajor, index) => {
		const { university, key, fullName, orders, referScore, englishListening, url, lastYearScore } = result;
		return {
			type: "bubble",
			body: {
				type: "box",
				layout: "vertical",
				contents: [
					{
						type: "text",
						text: isSaved ? "分科收藏" : `🔎 分科查詢結果 ${index + 1}`,
						weight: "bold",
						size: "lg",
						color: "#000000",
					},
					{
						type: "box",
						layout: "vertical",
						margin: "xl",
						spacing: "sm",
						contents: [
							{
								type: "box",
								layout: "baseline",
								spacing: "sm",
								contents: [
									{
										type: "text",
										text: "校系名稱",
										color: "#aaaaaa",
										size: "sm",
										flex: 2,
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
										text: "順序 1",
										color: "#aaaaaa",
										size: "sm",
										flex: 2,
									},
									{
										type: "text",
										text: orders[0] ?? "無",
										wrap: true,
										color: "#666666",
										size: "sm",
										flex: 5,
									},
								],
								margin: "15px",
							},
							{
								type: "box",
								layout: "baseline",
								spacing: "sm",
								contents: [
									{
										type: "text",
										text: "順序 2",
										color: "#aaaaaa",
										size: "sm",
										flex: 2,
									},
									{
										type: "text",
										text: orders[1] ?? "無",
										wrap: true,
										color: "#666666",
										size: "sm",
										flex: 5,
									},
								],
								margin: "15px",
							},
							{
								type: "box",
								layout: "baseline",
								spacing: "sm",
								contents: [
									{
										type: "text",
										text: "順序 3",
										color: "#aaaaaa",
										size: "sm",
										flex: 2,
									},
									{
										type: "text",
										text: orders[2] ?? "無",
										wrap: true,
										color: "#666666",
										size: "sm",
										flex: 5,
									},
								],
								margin: "15px",
							},
							{
								type: "box",
								layout: "baseline",
								spacing: "sm",
								contents: [
									{
										type: "text",
										text: "順序 4",
										color: "#aaaaaa",
										size: "sm",
										flex: 2,
									},
									{
										type: "text",
										text: orders[3] ?? "無",
										wrap: true,
										color: "#666666",
										size: "sm",
										flex: 5,
									},
								],
								margin: "15px",
							},
							{
								type: "box",
								layout: "baseline",
								spacing: "sm",
								contents: [
									{
										type: "text",
										text: "順序 5",
										color: "#aaaaaa",
										size: "sm",
										flex: 2,
									},
									{
										type: "text",
										text: orders[4] ?? "無",
										wrap: true,
										color: "#666666",
										size: "sm",
										flex: 5,
									},
								],
								margin: "15px",
							},
						],
					},
					{
						type: "separator",
						margin: "20px",
					},
					{
						type: "box",
						layout: "vertical",
						contents: [
							{
								type: "box",
								layout: "baseline",
								spacing: "sm",
								contents: [
									{
										type: "text",
										text: "學測採計",
										color: "#aaaaaa",
										size: "sm",
										flex: 2,
									},
									{
										type: "text",
										text: referScore,
										wrap: true,
										size: "sm",
										flex: 5,
										color: "#666666",
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
										text: "英聽採計",
										color: "#aaaaaa",
										size: "sm",
										flex: 2,
									},
									{
										type: "text",
										text: englishListening,
										wrap: true,
										size: "sm",
										flex: 5,
										color: "#666666",
									},
								],
								margin: "lg",
							},
						],
					},
					{
						type: "separator",
						margin: "20px",
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
						action: {
							type: "uri",
							label: "完整校系分則",
							uri: url,
						},
						color: ColorScheme.primary,
					},
					{
						type: "button",
						style: "link",
						height: "sm",
						action: {
							type: "uri",
							label: "去年錄取分數",
							uri: lastYearScore,
						},
						color: ColorScheme.primary,
					},
					isSaved
						? {
								type: "button",
								style: "secondary",
								height: "sm",
								action: {
									type: "postback",
									label: "取消收藏",
									data: "unsave-uac-" + university + "-" + key,
									displayText: "取消分科收藏 - " + fullName,
								},
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  }
						: {
								type: "button",
								style: "primary",
								height: "sm",
								action: {
									type: "postback",
									label: "加入收藏",
									data: "save-uac-" + university + "-" + key,
									displayText: "加入分科收藏 - " + fullName,
								},
								color: ColorScheme.primary,
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  },
				],
				flex: 0,
			},
		};
	});

	return {
		type: "flex",
		altText: "分科查詢結果",
		contents: {
			type: "carousel",
			contents: bubbles,
		},
	};
}
