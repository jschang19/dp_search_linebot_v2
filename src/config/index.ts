const MessageContent = {
	MajorNotFound: "沒有這個系所的資料，請檢查系所名稱",
	UniversityNotFound: "沒有這間學校的資料，請輸入正確的學校名稱",
	Error: {
		default: "發生錯誤，請稍後再試",
		save: "收藏校系時發生了一些問題，請稍後再試～",
	},
	Save: {
		NoSavedMajor: "目前沒有任何收藏，傳給我想收藏的校系名稱吧！\n\n（ 請確認是否切換至相對應的搜尋模式 ）",
		Success: "收藏成功",
		Removed: "已取消收藏",
		ExceedLimit: "收藏校系數量已達上限 （ 請確認是否切換至相對應的搜尋模式 ）",
		AlreadySaved: "已收藏過這個校系了～",
		HaventSaved: "目前沒有收藏過此校系，無需取消收藏喔～",
	},
};

const ColorScheme = {
	primary: "#000000",
	blue: "#1590fe",
};

export { MessageContent, ColorScheme };
