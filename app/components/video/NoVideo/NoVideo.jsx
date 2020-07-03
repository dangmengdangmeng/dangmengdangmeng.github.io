import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { SessionRoom, Event } from '@global/roomConstants';
import './NoVideo.scss';
import { YsGlobal } from '@global/handleGlobal';
const {
  video,
  video: { noCameraType },
  liveMobilePage,
} = YsGlobal.languageInfo;
const NoVideo = props => {
  const { userId } = props;
  const mySelf = SessionRoom.getMyself() || {};
  const { vfail: vFail, hasvideo: hasVideo, isInBackGround: InBackGround, role } = SessionRoom.getUser(userId) || {};
  const [vfail, setVfail] = useState(vFail);
  const [hasvideo, setHasvideo] = useState(hasVideo !== undefined ? hasVideo : true);
  const [shownetwork, setShownetwork] = useState('');
  const [isInBackGround, setIsInBackGround] = useState(InBackGround || false);
  useEffect(() => {
    const { medialinebad } = SessionRoom.getUser(userId) || {};
    if (userId === mySelf.id) {
      setShownetwork(medialinebad ? `${liveMobilePage.poorNetworkForMe}` : '');
    } else {
      setShownetwork(medialinebad ? `${liveMobilePage.poorNetwork}` : '');
    }
  }, [userId]);

  useEffect(() => {
    /* 处理用户属性改变 */
    const userPropertiesUpdate = data => {
      const { properties, id } = data;
      if (id === userId) {
        for (const [key, value] of Object.entries(properties)) {
          switch (key) {
            case 'medialinebad': {
              if (id === mySelf.id) {
                setShownetwork(value ? `${liveMobilePage.poorNetworkForMe}` : '');
              } else {
                setShownetwork(value ? `${liveMobilePage.poorNetwork}` : '');
              }
              break;
            }
            case 'hasvideo': {
              setHasvideo(value);
              break;
            }
            case 'vfail': {
              setVfail(value);
              break;
            }
            case 'isInBackGround':
              setIsInBackGround(!!value);
              break;
            default:
              break;
          }
        }
      }
    };
    const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    Event.on('user-properties-update', userPropertiesUpdate, listernerBackupid); // 用户属性改变
    return () => {
      Event.offAllByMarkId(listernerBackupid);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const showTip = () => {
    const text = role === 0 ? '' : video.pressedHome;
    // 本地：网络差>摄像头被禁用
    if (mySelf.id === userId) {
      if (!hasvideo) {
        return shownetwork || video.noCamera;
        // eslint-disable-next-line no-else-return
      } else {
        // 安卓的情况，hasvideo是true,就不用了考虑了
        if (vfail === undefined) {
          return shownetwork;
        }
        return shownetwork || noCameraType[vfail];
      }
    }
    // 远端：摄像头被禁用>网络差>App切到后台了
    if (!hasvideo) {
      return video.noCamera;
      // eslint-disable-next-line no-else-return
    } else {
      // 安卓的情况，hasvideo是true,就不用了考虑了
      if (vfail === undefined) {
        return shownetwork || text;
      }
      return noCameraType[vfail] || shownetwork || text;
    }
  };
  const noCamera = () => {
    if (!hasvideo) {
      return true;
      // eslint-disable-next-line no-else-return
    } else {
      if (vfail === undefined) {
        return false;
      }
      return !!vfail;
    }
  };
  // 学生切到后台的情况
  if (role !== 0) {
    return (
      isInBackGround && (
        <div className={`initError ${noCamera() ? 'videoError' : ''}`}>
          {isInBackGround && <i>!</i>}
          {showTip()}
        </div>
      )
    );
  }
  // 视频有问题的情况
  if (noCamera() || shownetwork) {
    return <div className={`initError videoError ${shownetwork ? 'networkError' : ''}`}>{showTip()}</div>;
  }
  // 正常情况
  return '';
};
const mapStateToProps = state => ({
  isClassBegin: state.classroom.isClassBegin,
  teacherId: state.user.teacherId,
});

const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(NoVideo);
