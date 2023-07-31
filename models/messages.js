export function TextMessage(text) {
	if (!text) throw new Error('Text Message is required');
	else return { type: 'text', text };
}

export function ResultMessage(university, extractedResults) {
	const bubble = [];
	extractedResults.forEach((result, index) => {
		const { name, numRecruit, numReview, numIsland, date, url, unewsUrl } = result;
		const json = {
			type: 'bubble',
			size: 'mega',
			body: {
				type: 'box',
				layout: 'vertical',
				contents: [
					{
						type: 'text',
						text: '🔎 科系查詢結果 ' + String(index + 1),
						weight: 'bold',
						size: 'xl',
						color: '#000000',
					},
					{
						type: 'box',
						layout: 'vertical',
						margin: 'lg',
						spacing: 'sm',
						contents: [
							{
								type: 'box',
								layout: 'baseline',
								spacing: 'sm',
								contents: [
									{
										type: 'text',
										text: '科系名稱 ',
										color: '#aaaaaa',
										size: 'sm',
										flex: 4,
									},
									{
										type: 'text',
										text: name,
										wrap: true,
										color: '#000000',
										size: 'sm',
										flex: 5,
										weight: 'bold',
									},
								],
							},
							{
								type: 'box',
								layout: 'baseline',
								spacing: 'sm',
								contents: [
									{
										type: 'text',
										text: '招生名額',
										color: '#aaaaaa',
										size: 'sm',
										flex: 4,
									},
									{
										type: 'text',
										text: numRecruit,
										wrap: true,
										color: '#666666',
										size: 'sm',
										flex: 5,
									},
								],
								margin: 'lg',
							},
							{
								type: 'box',
								layout: 'baseline',
								spacing: 'sm',
								contents: [
									{
										type: 'text',
										text: '預計甄試人數',
										color: '#aaaaaa',
										size: 'sm',
										flex: 4,
									},
									{
										type: 'text',
										text: numReview,
										wrap: true,
										color: '#666666',
										size: 'sm',
										flex: 5,
									},
								],
								margin: 'lg',
							},
							{
								type: 'box',
								layout: 'baseline',
								spacing: 'sm',
								contents: [
									{
										type: 'text',
										text: '離島外加名額',
										color: '#aaaaaa',
										size: 'sm',
										flex: 4,
									},
									{
										type: 'text',
										text: numIsland,
										wrap: true,
										color: '#666666',
										size: 'sm',
										flex: 5,
									},
								],
								margin: 'lg',
							},
							{
								type: 'box',
								layout: 'baseline',
								spacing: 'sm',
								contents: [
									{
										type: 'text',
										text: '甄試日期',
										color: '#aaaaaa',
										size: 'sm',
										flex: 4,
									},
									{
										type: 'text',
										text: date,
										wrap: true,
										color: '#666666',
										size: 'sm',
										flex: 5,
									},
								],
								margin: 'lg',
							},
						],
					},
				],
			},
			footer: {
				type: 'box',
				layout: 'vertical',
				spacing: 'sm',
				contents: [
					{
						type: 'button',
						style: 'link',
						height: 'sm',
						color: '#1590fe',
						action: {
							type: 'uri',
							label: '查看校系分則',
							uri: url,
						},
						margin: 'md',
					},
					{
						type: 'button',
						style: 'link',
						height: 'sm',
						color: '#1590fe',
						action: {
							type: 'uri',
							label: '學習歷程參採項目',
							uri: 'https://google.com', //setPortfolioURL(name)
						},
						margin: 'sm',
					},
					{
						type: 'button',
						style: 'link',
						height: 'sm',
						color: '#1590fe',
						action: {
							type: 'uri',
							label: '去年錄取分數',
							uri: setUniversityTWURL('regular', name),
						},
						margin: 'sm',
					},
					{
						type: 'button',
						style: 'link',
						height: 'sm',
						color: '#1590fe',
						action: {
							type: 'uri',
							label: '大學問連結',
							uri: unewsUrl,
						},
						margin: 'md',
					},
					{
						type: 'button',
						style: 'secondary',
						height: 'sm',
						action: {
							type: 'uri',
							label: '加入行事曆',
							uri: 'https://google.com', //setGoogleCalendarURLl(date, name)
						},
						margin: 'md',
					},
					{
						type: 'button',
						style: 'primary',
						height: 'sm',
						color: '#1590fe',
						action: {
							type: 'postback',
							label: '收藏科系',
							data: 'save-' + university + '-' + name,
							displayText: '加入個申收藏 - ' + name,
						},
						margin: 'md',
					},
				],
				flex: 0,
				margin: 'md',
			},
		};
		bubble.push(json);
	});

	return {
		type: 'flex',
		altText: '個人申請科系查詢結果',
		contents: {
			type: 'carousel',
			contents: bubble,
		},
	};
}

function setPortfolioURL(name) {
	let serial_num = name.match(/\d/g);
	serial_num = serial_num.join('');
	let school_serial_num = serial_num.substring(0, 3); // 學校代碼
	let url_param = name.replace('大學', '大學-').replace(' ', '').replace(`(${serial_num})`, '').replace('APCS組', '').replace('(資安組)', '');

	return encodeURI(`https://www.cac.edu.tw/cacportal/jbcrc/LearningPortfolios_MultiQuery_ppa/LPM_readfile_html.php?fileid=${school_serial_num}-${url_param}`);
}

function setGoogleCalendarURL(date, name) {
	date = date.replaceAll(' ', '').replace('\n', '');
	if (date.includes('至')) {
		date = date.split('至');
		start = date[0].replaceAll('.', '').replaceAll('112', '2023');
		end = date[1].replaceAll('.', '').replaceAll('112', '2023');
	} else if (date.includes('、')) {
		date = date.split('、');
		start = date[0].replaceAll('.', '').replaceAll('112', '2023');
		end = date[1].replaceAll('.', '').replaceAll('112', '2023');
	} else if (date == '--' || date == '無') {
		return 'https://calendar.google.com/calendar/u/0/r';
	} else {
		start = date.replaceAll('.', '').replaceAll('112', '2023');
		end = start;
	}

	event_title = name + '二階甄試';
	event_details = name + '二階面試的日期，準確時間請依照各校的正式面試簡章為主。';
	calendar_url = encodeURI(`https://calendar.google.com/calendar/u/0/render?action=TEMPLATE&dates=${start}T000000Z/${end}T090000Z&text=${event_title}&details=${event_details}`);

	if (calendar_url.length > 1000) {
		return encodeURI(`https://calendar.google.com/calendar/u/0/render?action=TEMPLATE&dates=${start}T000000Z/${end}T090000Z&text=${event_title}`);
	}
	return calendar_url;
}

function setUniversityTWURL(type, name) {
	if (!type || !name) {
		throw new Error('setUniversityTW: type or name is undefined');
	}
	let serial_num = name.match(/\d/g);
	serial_num = serial_num.join('');

	const school_serial_num = serial_num.substring(0, 3); // 學校代碼
	switch (type) {
		case 'regular':
			return encodeURI(`https://university-tw.ldkrsi.men/caac/${school_serial_num}/${serial_num}`);
		case 'star':
			return encodeURI(`https://university-tw.ldkrsi.men/star/${school_serial_num}/${serial_num}`);
	}
}
