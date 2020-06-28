import globalInfo from '../globalInfo';

const { Event, Room: YSRoomSdk } = globalInfo.YSSession;
class RoomListener {
	constructor() {
		this.instance = null;
		Event.on('video-state-changed', this.videoStateChanged);
		Event.on('screen-state-changed', this.screenStateChanged);
	}

	/**
     *  roomlistener实例
     */
	static getInstance() {
		if (!this.instance) {
			this.instance = new RoomListener();
		}
		return this.instance;
	}

	/**
	 * 收到视频状态改变事件
	 * @param {{
	 * userId: string 发布该流的用户id
	 * videoPublished: boolean, 视频是否发布
	 * audioPublished: boolean, 音频是否发布
	 * publishstate: 0|1|2|3|4, 发布状态
	 * stream: stream,
	 * }} data 视频状态数据
	 */
	videoStateChanged(data) {
		const { userId, videoPublished, audioPublished, publishstate, stream } = data;
		globalInfo.streamList[userId] = stream;
		let videoBoxEle = document.getElementById(`video_${userId}`);
		const videoContainerEle = document.getElementById('videoContainer');
		if (!videoBoxEle) {
			videoBoxEle = document.createElement('div');
			videoBoxEle.id = `video_${userId}`;
			videoBoxEle.classList.add('video-player');
			videoContainerEle.appendChild(videoBoxEle);
		}
		if (videoPublished) {
			YSRoomSdk.playVideo(userId, videoBoxEle.id);
		} else {
			YSRoomSdk.unplayVideo(userId);
		}
		if (audioPublished) {
			YSRoomSdk.playAudio(userId);
		} else {
			YSRoomSdk.unplayAudio(userId);
		}
		if (publishstate === 0 && videoBoxEle) {
			videoContainerEle.removeChild(videoBoxEle);
		}
		console.error('videoStateChanged:', userId, videoPublished, audioPublished, publishstate);
	}

	screenStateChanged(data) {
		const { userId, published } = data;
		if (published) {
			if (userId !== YSRoomSdk.getMyself().id) {
				YSRoomSdk.playVideo(userId, 'playScreenVideo', { type: 'screen', fit: 'contain' });
			}
		}
		console.error('屏幕共享状态改变事件:', data, YSRoomSdk.getUsers());
	}
}

export default RoomListener;
