import YSSession from '../../src/main'; // 开发中使用
// import YSSession from '../libs/ysSession.js'; // pro环境直接导入使用
// const { Room } = YSSession; // script标签引入sdk时使用

export default {
	// YSSession: window.YSSession.default, // script标签引入sdk时使用
	YSSession,
	roomClient: {},
	checkRoomResult: {},
	streamList: {},
};
