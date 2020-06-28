import './css/init.css';
import './css/index.scss';

import globalInfo from './src/globalInfo';
import HandleRoom from './src/room/HandleRoom';
import RoomListener from './src/room/RoomListener';
import './src/handleElement/handleVideo';
import './src/handleElement/handleScreen';

const { Room: YSRoomSdk } = globalInfo.YSSession;

const testparams = {
	restrict: 0, // TODO:有缓存的servername就传servername否则传0
	domain: 'yaolantu',
	param: "8axKoWANCG2ZHDF-bwYHjTI9hIQsNz0wTphYRTaM6yATQbJKboFJN0ZJk5owWZNsbc-gJlcLyW1mn9S2gpsllV3C8zGfLcLcN7t8ul4ZGK8prmpGPAZ19QTzxyKBDg7fepLZoPhjKkE",
	roomtype: '3',
	clientType: 1, // 1:PC 2:Android ,3:IOS , 4:PC客户端
};
YSRoomSdk.checkRoom('console.roadofcloud.net', undefined, testparams)
	.then((data) => {
		globalInfo.checkRoomResult = data;
		const { newcourseaddr } = data;
		const { webaddr } = newcourseaddr[0];
		const config = {
			hostname: webaddr,
			// port: signalport,
		};
		globalInfo.roomClient = YSRoomSdk.createClient(config);
		HandleRoom.initUi();
		RoomListener.getInstance();
		HandleRoom.joinRoom();
	}).catch((err) => {
		console.error('checkRoom:', err);
	});
