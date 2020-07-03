export interface ServcieInfo {
	protocol: string;
	host: string;
	port: number;
	webRequest: string;
	aliUrl?: string;
}

export interface DocAddress {
	protocol: string;
	host: string;
	port: number;
}

export interface IYsGlobal {
	playback: boolean; // 是否回放
	newPlayback:any;
	loginType: 0 | 1 | 2 | 4 | -1 | 88;
	joinUrl: string;
	entryUserId: string;
	domain: string;
	roomType: number;
	roomClient: any;
	ysVersion: string;
	updateTime: string;
	languageName: string;
	languageInfo: any; // 语言信息
	connectServerTime: string; // 房间连接时的服务器时间
	roomConfigItem: any; // 房间配置
	roomInfo: any; // 房间信息
	isMobile: boolean;
	msgList: [];
	videoSizeMouseMoveEventName: string; // 鼠标移动触发事件的名字（视频拉伸中用到）
	videoSizeMouseUpEventName: string; // 鼠标抬起触发事件的名字（视频拉伸中用到）
	isVideoStretch: boolean; // 是否是拉伸状态
	isCheckVideoDevice: boolean; // 是否检测视频设备
	isCheckAudioOutput: boolean; // 是否检测扬声器设备
	isWheatCheckEquipment: boolean; // 上麦前检测设备
	isSafari: boolean; // 是否Safari浏览器
	chatList: [];
	currentFile: any;
	serviceInfo: ServcieInfo;
	docAddress: DocAddress;
	backupDocAddressList: DocAddress[];
	jumpurl: any;
	MAX_FILE_SIZE: number;
	defaultFile: any;
}