import fs from "fs";
import csv from "csv-parser";

function readCSV(path: string) {
	return new Promise((resolve, reject) => {
		// 檢查檔案是否存在
		fs.access(path, fs.constants.F_OK, (err) => {
			if (err) {
				// 如果檔案不存在或發生其他錯誤，則拒絕 Promise
				return reject(new Error(`File not found: ${path}`));
			}

			// 檔案存在，處理 CSV
			const results: unknown[] = [];
			fs.createReadStream(path)
				.pipe(csv())
				.on("data", (data) => results.push(data))
				.on("end", () => resolve(results))
				.on("error", (error) => reject(error));
		});
	});
}

export default readCSV;
