import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { Event, SessionRoom, ROOM_ROLE, BASE_WIDTH, BASE_NUMBER, VIDEO_DRAG_BOUND_ID } from '@global/roomConstants';
import Actions from '@global/actions';
import { YsGlobal } from '@global/handleGlobal';
import Signalling from '@global/services/SignallingService';
import VideoService from '@global/services/VideoService';
import store from '@app/store';

export const videoDragHOC = WrappedComponent => {
  return props => {
    const { maxVideo, isLiveRoom } = JSON.parse(props.roomInfo);
    if (isLiveRoom || maxVideo <= 2) {
      return <WrappedComponent {...props} />;
    }
    const { streamInfo, videoDragInfo, videoSizeProps = {}, isVideoLayout, doubleVideoId, isFullScreen } = props;
    const [renderCount, setRenderCount] = useState(0);
    const videoDrag = videoDragInfo[streamInfo.streamUserId] || {};
    const { resizeScale = 2 } = videoSizeProps.videoResizeStyle || {};
    const headerHeight = YsGlobal.isMobile ? 0 : 0.44;
    const defalutFontSize = (window.innerWidth / BASE_WIDTH) * BASE_NUMBER;
    const content = document.getElementById(VIDEO_DRAG_BOUND_ID) || {}; // 白板拖拽区域
    const contentW = content.clientWidth;
    const contentH = content.clientHeight;

    const dragEnd = (eleOffset, id) => {
      if (eleOffset && id === streamInfo.streamUserId) {
        // eleOffset.x, eleOffset.y: 相对整个页面的坐标px值
        const { initVideoWidth, initVideoHeight } = VideoService.getInitVideoSize();
        const videoWidth = initVideoWidth * resizeScale;
        const videoHeight = initVideoHeight * resizeScale;

        // 拖拽元素不能拖出白板区
        const { dragEleOffsetLeft, dragEleOffsetTop } = limitposition(eleOffset.x, eleOffset.y, videoWidth, videoHeight);
        // 计算相对白板区位置的百分比
        const { left: minLeft } = content.getBoundingClientRect();
        const videoListEle = document.getElementById('student-video-list');
        let dragEleLeft = (dragEleOffsetLeft - minLeft) / (contentW - videoWidth);
        let dragEleTop = (dragEleOffsetTop - headerHeight * defalutFontSize - videoListEle.clientHeight) / (contentH - videoHeight);
        dragEleLeft = !dragEleLeft || dragEleLeft === Infinity ? 0 : dragEleLeft;
        dragEleTop = !dragEleTop || dragEleTop === Infinity ? 0 : dragEleTop;
        const dragEleStyle = {
          userId: id,
          percentTop: dragEleTop,
          percentLeft: dragEleLeft,
          scale: resizeScale,
          isDrag: true,
        };
        Actions.setVideoDragInfo(dragEleStyle);
        Signalling.sendVideoAttribute(dragEleStyle, id);
      }
    };

    /**
     * 限制拖拽范围不能超出白板区
     * @param {number} left 视频拖拽后的left
     * @param {number} top  视频拖拽后的top
     * @param {number} videoWidth 视频宽度
     * @param {number} videoHeight 视频高度
     * @returns {object} 限制后的left和top
     */
    const limitposition = (left, top, videoWidth, videoHeight) => {
      const videoListEle = document.getElementById('student-video-list');
      const { width, left: minLeft } = content.getBoundingClientRect();
      const maxLeft = minLeft + width - videoWidth;
      const dragEleOffsetLeft = Math.max(minLeft, Math.min(left, maxLeft));
      const maxTop = isFullScreen ? contentH - videoHeight : headerHeight * defalutFontSize + contentH + videoListEle.clientHeight - videoHeight;
      const minTop = isFullScreen ? 0 : headerHeight * defalutFontSize + videoListEle.clientHeight;
      const dragEleOffsetTop = Math.max(minTop, Math.min(top, maxTop));
      return {
        dragEleOffsetLeft,
        dragEleOffsetTop,
      };
    };

    const percentageToRem = (percentLeft, percentTop) => {
      const videoListEle = document.getElementById('student-video-list');
      if (!content.getBoundingClientRect || !videoListEle) {
        return { videoLeft: 0, videoTop: 0 };
      }
      const { left: minLeft } = content.getBoundingClientRect();
      const { initVideoWidth, initVideoHeight } = VideoService.getInitVideoSize();
      const videoWidth = initVideoWidth * resizeScale;
      const videoHeight = initVideoHeight * resizeScale;
      const videoLeft = (percentLeft * (contentW - videoWidth) + minLeft) / defalutFontSize;
      const videoTop = YsGlobal.isMobile
        ? (percentTop * (contentH - videoHeight)) / defalutFontSize + 5.625 + 0.8
        : (percentTop * (contentH - videoHeight) + videoListEle.clientHeight) / defalutFontSize;
      return { videoLeft, videoTop };
    };

    useEffect(() => {
      // 拖拽位置改变后需要重新render一次，解决白板大小变化后位置不对的问题
      const count = renderCount + 1;
      setRenderCount(count);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoDragInfo]);

    useEffect(() => {
      return () => {
        const userInfo = SessionRoom.getUser(streamInfo.streamUserId) || {};
        if (userInfo.role !== 0) {
          Actions.deleteVideoDragInfo(streamInfo.streamUserId);
          const mySelfInfo = SessionRoom.getMyself() || {};
          if (streamInfo.streamUserId === mySelfInfo.id) {
            Signalling.sendVideoAttribute({}, streamInfo.streamUserId, true);
          }
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const handlePubMsg = pubMsgData => {
        const { name, data } = pubMsgData;
        if (name === 'VideoAttribute') {
          Actions.setVideoDragInfo(data);
        }
      };
      const handleDelMsg = delMsgData => {
        const { name, id } = delMsgData;
        if (name === 'VideoAttribute' && id.endsWith(streamInfo.streamUserId)) {
          Actions.deleteVideoDragInfo(streamInfo.streamUserId);
        }
      };
      const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
      Event.on('recv-pub-msg', handlePubMsg, listernerBackupid);
      Event.on('recv-del-msg', handleDelMsg, listernerBackupid);
      return () => {
        Event.offAllByMarkId(listernerBackupid);
      };
    }, [streamInfo]);

    // 使用 useDrag
    const [, dragSource] = useDrag({
      item: { type: 'videoDrag' },
      begin: () => {
        Actions.setWhiteBoardLay(true);
        return { type: 'videoDrag', id: streamInfo.streamUserId };
      },
      end(item, mintor) {
        Actions.setWhiteBoardLay(false);
        if (mintor.getDropResult()) {
          const { eleOffset } = mintor.getDropResult();
          const { id } = item;
          dragEnd(eleOffset, id);
        }
      },
      canDrag() {
        const { isClassBegin } = store.getState().classroom;
        const mySelfInfo = SessionRoom.getMyself() || {};
        return (
          isClassBegin &&
          mySelfInfo.role !== ROOM_ROLE.STUDENT &&
          !YsGlobal.isVideoStretch &&
          !isVideoLayout &&
          !doubleVideoId &&
          mySelfInfo.role !== ROOM_ROLE.PATROL
        );
      },
    });
    const { videoLeft, videoTop } = percentageToRem(videoDrag.percentLeft, videoDrag.percentTop);

    const videoDragStyle = {
      position: 'fixed',
      top: `${videoTop + headerHeight}rem`,
      left: `${videoLeft}rem`,
      margin: 0,
      transform: 'none',
      zIndex: 250,
      padding: 0,
    };
    const videoDragProps = {
      videoDragStyle: videoDrag.isDrag ? videoDragStyle : {},
      dragSource,
      videoDrag,
    };
    return <WrappedComponent {...props} videoDragProps={videoDragProps} />;
  };
};
