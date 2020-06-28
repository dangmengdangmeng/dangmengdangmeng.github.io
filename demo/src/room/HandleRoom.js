import globalInfo from '../globalInfo';

class HandleRoom {
	constructor() {
		this.instance = null;
	}

	// room实例
	static getInstance() {
		if (!this.instance) {
			this.instance = new HandleRoom();
		}
		return this.instance;
	}

	// 进入房间
	joinRoom() {
		const { newcourseaddr, room, roomrole, nickname, thirdid, ipinfo = {} } = globalInfo.checkRoomResult;
		const { name } = newcourseaddr[0];
		const { country, city, area, perators, selfip } = ipinfo;
		const userproperties = {
			id: thirdid || '', // 用户的唯一标识
			role: roomrole,
			nickname,
			disablechat: false,
			candraw: false,
			giftnumber: 0,
			primaryColor: '#FF0000', // 视频右上角的画笔颜色
			servername: name, // 信令线路名
			medialine: name, // 媒体线路名 // TODO:有缓存则传缓存的medialine，没有就传name
			ys_ip: selfip, // 本地ip
			ys_area: `${country}.${city}.${area}`, // 国家+城市+地区
			ys_carrier: perators, // 运营商
		};
		const { Room: YSRoomSdk } = globalInfo.YSSession;
		YSRoomSdk.init()
			.then(() => {
				YSRoomSdk.joinRoom(room.serial, { userproperties })
					.then(joinData => {
						console.error('加入房间成功123：', joinData);
					}).catch(err => {
						console.error('加入房间失败', err);
					});
			}).catch(err => {
				console.error('初始化失败', err);
			});
	}

	initUi() {
		const { room } = globalInfo.checkRoomResult;
		const roomNumEle = document.getElementById('roomNum');
		const playLocalVideoEle = document.getElementById('playLocalVideo');
		const publishVideoEle = document.getElementById('publishVideo');
		roomNumEle.innerText = room.serial;
		playLocalVideoEle.classList.remove('disabled');
		publishVideoEle.classList.remove('disabled');
	}
}

export default HandleRoom.getInstance();
