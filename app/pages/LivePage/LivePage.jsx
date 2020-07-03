import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import RoomService from '@global/services/RoomService';
import { YsGlobal } from '@global/handleGlobal';
import { Event, SessionRoom, ROOM_STATE, ROOM_ROLE } from '@global/roomConstants';
import NetworkJitter from '@containers/NetworkJitter/NetworkJitter';
import Automedialine from '@containers/NetworkJitter/Automedialine';
import { useDrop } from 'react-dnd';
import './LivePage.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Section from './Section/Section';
import Sidebar from './Sidebar/Sidebar';
import RoomLoading from '../../containers/RoomLoading/RoomLoading';

const { pagesText } = YsGlobal.languageInfo;

const LivePage = props => {
  const [test, setTest] = useState(false);
  useEffect(() => {
    const qwer = !test;
    setTest(qwer);
  }, [props.roomStatus]);

  const [, dropTarget] = useDrop({
    // accept 是一个标识，需要和对应的 drag 元素中 item 的 type 值一致，否则不能感应
    accept: 'videoDrag',
    drop(item, monitor) {
      return { eleOffset: monitor.getSourceClientOffset() };
    },
    // collect 函数，返回的对象会成为 useDrop 的第一个参数，可以在组件中直接进行使用
  });
  useEffect(() => {
    RoomService.initRoom();
    return () => {
      YsGlobal.roomClient.leaveChannel();
    };
  }, []);

  const mouseLeave = event => {
    const mySelf = SessionRoom.getMyself() || {};
    const canChangeResizeEle = mySelf.role !== ROOM_ROLE.STUDENT;
    if (canChangeResizeEle) {
      if (YsGlobal.videoSizeMouseUpEventName) {
        Event.trigger(YsGlobal.videoSizeMouseUpEventName, { event });
      }
    }
  };

  const mouseMove = event => {
    const mySelf = SessionRoom.getMyself() || {};
    const canChangeResizeEle = mySelf.role !== ROOM_ROLE.STUDENT;
    if (canChangeResizeEle) {
      if (YsGlobal.videoSizeMouseMoveEventName) {
        Event.trigger(YsGlobal.videoSizeMouseMoveEventName, { event });
      }
    }
  };

  const mouseUp = event => {
    const mySelf = SessionRoom.getMyself() || {};
    const canChangeResizeEle = mySelf.role !== ROOM_ROLE.STUDENT;
    if (canChangeResizeEle) {
      // 如果您想以一个异步的方式来访问事件属性，您应该对事件调用event.persist()。这将从事件池中取出合成的事件，并允许该事件的引用，使用户的代码被保留
      event.persist();
      if (YsGlobal.videoSizeMouseUpEventName) {
        Event.trigger(YsGlobal.videoSizeMouseUpEventName, { event });
      }
    }
  };

  const renderLivePage = () => {
    const { roomStatus } = props;
    const mySelf = SessionRoom.getMyself() || {};
    const addEventsNone = mySelf.role === 4 ? 'patrol-events-none' : '';
    const { maxVideo, isLiveRoom } = JSON.parse(props.roomInfo);
    return (
      <div ref={dropTarget} className={`livePage ${YsGlobal.playback ? 'playback' : ''} ${addEventsNone}`}>
        <Header />
        <NetworkJitter show={roomStatus === ROOM_STATE.DISCONNECT} />
        <Automedialine />
        <div className="container" onMouseUp={mouseUp} onMouseMove={mouseMove} onMouseLeave={mouseLeave}>
          <Section />
          {test}
          {maxVideo === 2 && !isLiveRoom && <Sidebar />}
        </div>
        {roomStatus === ROOM_STATE.INIT && <RoomLoading roomStatus={roomStatus} />}
        <Footer />
      </div>
    );
  };

  const renderClassEnd = () => {
    return (
      <div className="connect-loading">
        <div className="loading_inner"> {pagesText.livePageInner.classOver}</div>
      </div>
    );
  };

  const { roomStatus, isClassBegin } = props;
  if (roomStatus !== ROOM_STATE.END) {
    return renderLivePage();
  }
  if (isClassBegin === false || roomStatus === ROOM_STATE.END) {
    return renderClassEnd();
  }
  return '';
};

const mapStateToProps = state => ({
  roomStatus: state.classroom.roomStatus,
  isClassBegin: state.classroom.isClassBegin,
  roomInfo: JSON.stringify(state.classroom.roomInfo),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LivePage);
