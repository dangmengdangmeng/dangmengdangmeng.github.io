const ajax = (ajaxData) => new Promise((resolve, reject) => {
	const { url, params, isUpLoadFile = false, progress } = ajaxData;
	const xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = () => {
		if (xmlHttp.readyState !== 4) {
			return;
		}
		if ((xmlHttp.status >= 200 && xmlHttp.status < 300) || xmlHttp.status === 304) {
			xmlHttp.upload.onprogress = null;
			resolve(xmlHttp.response);
		} else {
			reject(new Error(xmlHttp.statusText));
		}
	};
	if (progress) {
		xmlHttp.upload.onprogress = progress;
	}
	xmlHttp.open('post', url);
	xmlHttp.responseType = 'json';
	let data = '';
	if (!isUpLoadFile) {
		for (const [key, value] of Object.entries(params)) {
			data += `${key}=${value}&`;
		}
		xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
	} else {
		data = params;
	}
	xmlHttp.send(data);
});

export default ajax;
