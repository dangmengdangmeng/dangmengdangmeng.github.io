// import 'isomorphic-fetch';

const JSON_HEADER_CONF = {
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  // 'Content-Type': 'application/json',
};

const getParamUrl = (url: string, params = {}) => {
  let localParams = {}; // browserUtils.LocalStorage.getObj('params');
  localParams = Object.assign({}, localParams, params);
  let resUrl = url;
  if (resUrl.indexOf('?') === -1) resUrl += '?1=1';
  Object.entries(localParams).forEach(
    // eslint-disable-next-line no-return-assign
    ([key, value]) => (resUrl += `&${key}=${value}`),
  );
  return resUrl;
};

export const post = async (url: string, data = {}, istype, requestHeaders) => {
  const headers = {
    ...JSON_HEADER_CONF,
    ...requestHeaders,
  };
  const params = {
    method: 'POST',
    headers,
  };
  if (data) {
    const searchParams = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof Array) {
        // eslint-disable-next-line no-console
        value.forEach((item, index) => {
          if (item instanceof Object) {
            Object.entries(item).forEach(([objKey, objVal]) => {
              searchParams.append(`${key}[${index}][${objKey}]`, objVal);
            });
          } else {
            searchParams.append(`${key}[${index}]`, item);
          }
        });
      } else {
        searchParams.append(key, value);
      }
    });
    params.body = searchParams.toString();
  }

  if (istype === 'object') {
    params.body = JSON.stringify(data);
  }

  const res = await fetch(url, params)
    .then(response => {
      // ok代表状态码在200-299
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log(err.toString());
    });
  if (res && res.code && ![0, 200].includes(res.code)) {
    // eslint-disable-next-line no-console
    console.log(res);
  }
  return res;
};

export const get = async (URL, data) => {
  const opts = {
    method: 'GET',
  };
  const url = getParamUrl(URL, data);
  const res = await fetch(url, opts)
    .then(response => {
      // ok代表状态码在200-299
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log(err.toString());
    });
  if (res && res.code && ![0, 200].includes(res.code)) {
    // eslint-disable-next-line no-console
    console.log(res);
  }
  return res;
};

export const ajax = (ajaxData) => new Promise((resolve, reject) => {
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

