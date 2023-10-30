const logMessage = (severity: string, message: string) => {
	console.log(JSON.stringify({ severity, message }));
};

export default logMessage;
