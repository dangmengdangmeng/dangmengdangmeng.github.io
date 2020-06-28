import globalInfo from '../room/globalInfo';
import ajax from './ajax';
import utils from './utils';
import UserControl from '../room/handleData/UserControl';
import RoomControl from '../room/handleData/RoomControl';

const { YSRTC } = globalInfo;
const request = {
	/* 检测房间，获取房间信息
	* @params params: 获取房间信息的基本参数, object
	* params = {
		TODO: 需要和php对接口有哪些参数
		}
	* */
	checkRoom(params) {
		const { webaddr, webProtocol, webPort } = RoomControl.getRoomAddress();
		const url = `${webProtocol}://${webaddr}:${webPort}/ClientAPI/enterroom?ts=${new Date().getTime()}`;
		return ajax({ url, params });
	},
	sendDeviceInfo() {
		const { browserInfo, checkRoomResult } = globalInfo;
		const myself = UserControl.getMyself();
		const { webaddr, webProtocol, webPort } = RoomControl.getRoomAddress();
		const url = `${webProtocol}://${webaddr}:${webPort}/LogData/equipment?ts=${new Date().getTime()}`;
		const ipInfo = checkRoomResult.ipinfo || {};
		const params = {
			serial: checkRoomResult.serial,
			companyid: checkRoomResult.room.companyid, // 企业id
			peerid: myself.id, // 用户id
			peername: myself.nickname, // 用户名称
			peerrole: myself.role, // 用户角色
			ip: ipInfo.selfip, // 本机ip
			country: ipInfo.country, // 当前用户所在国家
			region: ipInfo.city, // 当前用户所在地区
			city: ipInfo.area, // 当前用户所在城市
			isp: ipInfo.perators, // 网络运营商
			osversion: utils.detectOS(), // 设备系统版本（如Win10/Win7/Mac）
			devicemodel: `${browserInfo.info.browserName} ${browserInfo.info.browserVersion}`, // 浏览器名称
			cpuarchitecture: browserInfo.cpuarchitecture || 'x86', // cpu架构（arm64 x86 ...）
			sdkversion: YSRTC.VERSION, // SDK版本号
			// redirectcount: redirectcount,// 进入房间成功前重选线路次数
			routename: myself.servername, // 成功进入房间的线路名
			docServer: webaddr, // 当前使用CDN
		};
		// DeviceManager.getDevices(devicesInfo => {
		// 	console.error(3333, devicesInfo)
		// 	if (devicesInfo) {
		// 		params.audioinput = devicesInfo.audioinput ? devicesInfo.audioinput.label : '';
		// 		params.videoinput = devicesInfo.videoinput ? devicesInfo.videoinput.label : '';
		// 		params.audiooutput = devicesInfo.audiooutput ? devicesInfo.audiooutput.label : '';
		// 	}
		// });
		return ajax({ url, params });
	},
};
export default request;
