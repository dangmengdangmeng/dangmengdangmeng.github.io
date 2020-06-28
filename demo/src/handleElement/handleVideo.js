import globalInfo from '../globalInfo';

const { Room: YSRoomSdk } = globalInfo.YSSession;

const playLocalVideoEle = document.getElementById('playLocalVideo');
const publishVideoEle = document.getElementById('publishVideo');
const closeVideoEle = document.getElementById('closeVideo');
const closeAudioEle = document.getElementById('closeAudio');
const videoContainerEle = document.getElementById('videoContainer');
const stopPublishVideoEle = document.getElementById('stopPublishVideo');

playLocalVideoEle.addEventListener('click', () => {
	const myself = YSRoomSdk.getMyself();
	const videoBoxEle = document.createElement('div');
	videoBoxEle.id = `video_${myself.id}`;
	videoBoxEle.classList.add('video-player');
	videoContainerEle.appendChild(videoBoxEle);
	YSRoomSdk.playVideo(myself.id, videoBoxEle.id, {}, data => {
		if (!data) {
			console.error('播放本地视频成功');
			playLocalVideoEle.classList.add('disabled');
			publishVideoEle.classList.remove('disabled');
			closeVideoEle.classList.remove('disabled');
			closeAudioEle.classList.remove('disabled');
		} else {
			console.error('播放本地视频失败', data);
		}
	});
});

publishVideoEle.addEventListener('click', () => {
	const myself = YSRoomSdk.getMyself();
	globalInfo.roomClient.setProperty(myself.id, { publishstate: 3 });
	stopPublishVideoEle.classList.remove('disabled');
	publishVideoEle.classList.add('disabled');
});

stopPublishVideoEle.addEventListener('click', () => {
	const myself = YSRoomSdk.getMyself();
	globalInfo.roomClient.setProperty(myself.id, { publishstate: 0 });
	publishVideoEle.classList.remove('disabled');
});
closeVideoEle.addEventListener('click', () => {
	const myself = YSRoomSdk.getMyself();
	const properties = {};
	if (myself.publishstate === 1) {
		properties.publishstate = 3;
	} else if (myself.publishstate === 2) {
		properties.publishstate = 4;
	} else if (myself.publishstate === 3) {
		properties.publishstate = 1;
	} else if (myself.publishstate === 4) {
		properties.publishstate = 2;
	} else if (myself.publishstate === 0) {
		properties.publishstate = 2;
	}
	if ([0, 1, 4].includes(properties.publishstate)) {
		closeVideoEle.innerText = '打开视频';
	} else {
		closeVideoEle.innerText = '关闭视频';
	}
	globalInfo.roomClient.setProperty(myself.id, properties);
});
closeAudioEle.addEventListener('click', () => {
	const myself = YSRoomSdk.getMyself();
	const properties = {};
	if (myself.publishstate === 1) {
		properties.publishstate = 4;
	} else if (myself.publishstate === 2) {
		properties.publishstate = 3;
	} else if (myself.publishstate === 3) {
		properties.publishstate = 2;
	} else if (myself.publishstate === 4) {
		properties.publishstate = 1;
	} else if (myself.publishstate === 0) {
		properties.publishstate = 1;
	}
	if ([0, 2, 4].includes(properties.publishstate)) {
		closeAudioEle.innerText = '打开音频';
	} else {
		closeAudioEle.innerText = '关闭音频';
	}
	globalInfo.roomClient.setProperty(myself.id, properties);
});
