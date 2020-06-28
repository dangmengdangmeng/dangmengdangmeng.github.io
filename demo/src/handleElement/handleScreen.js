import globalInfo from '../globalInfo';

const { Room: YSRoomSdk } = globalInfo.YSSession;

const startScreenEle = document.getElementById('startScreen');

startScreenEle.addEventListener('click', () => {
	if (startScreenEle.innerText === '开始共享屏幕') {
		YSRoomSdk.startShareScreen();
		startScreenEle.innerText = '停止屏幕共享';
	} else {
		YSRoomSdk.stopShareScreen();
		startScreenEle.innerText = '开始共享屏幕';
	}
});
