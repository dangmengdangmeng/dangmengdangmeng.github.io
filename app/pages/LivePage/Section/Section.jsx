import React from 'react';
import { connect } from 'react-redux';
import CallRoll from '@containers/callRollAndSignIn/callRoll'; // 点名
import PlugCheck from '@containers/ShareSmart/plugCheck/PlugCheck'; // 插件检查
import LuckyDraw from '@containers/LuckyDraw/LuckyDraw'; // 抽奖
import Vote from '@containers/Vote/Vote'; // 投票答题
import Answer from '@containers/Answer/Answer'; // 投票答题
import CountDown from '@containers/CountDown/CountDown'; // 计时器
import ShowAlert from '@containers/ShowAlert/ShowAlert'; // 弹框
import Notification from '@containers/Notification/Notification'; // 通知
import YSDrag from '@containers/YSDrag/YSDrag'; // 拖拽
import ModalBackdrop from '@components/ModalBackdrop/ModalBackdrop'; // 弹框遮罩层
import UploadPictures from '@containers/UploadPictures';
import Responder from '@containers/Responder/Responder';
import Chat from '@containers/Chat';
import { SessionRoom } from '@global/roomConstants';
import Actions from '@global/actions';
import MainWhiteboard from '../../../containers/MainWhiteboard/MainWhiteboard';
import StudentVideoList from '../../../containers/StudentVideoList/StudentVideoList';
import './section.scss';

class Section extends React.Component {
  self = SessionRoom.getMyself();

  onStart() {
    Actions.setWhiteBoardLay(true);
    // this.setState({ activeDrags: ++this.state.activeDrags });
  }

  onDrag() {
    // console.error('===> args: ', args);
  }

  onStop() {
    Actions.setWhiteBoardLay(false);
    // console.error('===> args: ', args);
  }

  render() {
    const dragHandlers = {
      onStart: this.onStart.bind(this),
      onStop: this.onStop.bind(this),
      onDrag: this.onDrag.bind(this),
    };
    const {
      toolsBoxState = {},
      luckyState,
      modalIsShow,
      answerState,
      visible,
      isShowUpPic,
      responserStatus,
      studentStreamList,
      selectChat,
      roomInfo,
    } = this.props;
    const { luckyDraw, vote, callRoll, answer, chat } = JSON.parse(toolsBoxState);
    const mySelf = SessionRoom.getMyself();
    const isShowVotePubPanel = vote.voteState === 'isSetVoteInfo' && vote.voteData.sendVoteUserId === mySelf.id;
    const { maxVideo, isLiveRoom } = JSON.parse(roomInfo);
    return (
      <div id="section" className={`section ${studentStreamList.length ? 'hasStudentStream' : ''}`}>
        {(responserStatus ||
          luckyState ||
          (vote.voteState !== 'isSetVoteInfo' && vote.voteState !== '') ||
          isShowVotePubPanel ||
          !['', 'disable'].includes(callRoll.callRollState) ||
          modalIsShow ||
          (answerState && answerState !== 'disable') ||
          isShowUpPic ||
          visible === 'deviceSetting') && <div className="NoPermission" />}
        <div className="modules">
          {!['', 'disable'].includes(callRoll.callRollState) && (
            <YSDrag moduleName="callRoll" bounds=".modules" dragHandlers={dragHandlers}>
              <CallRoll />
            </YSDrag>
          )}
          {luckyDraw.luckyState !== '' && (
            <YSDrag bounds=".modules">
              <LuckyDraw />
            </YSDrag>
          )}
          {((vote.voteState !== 'isSetVoteInfo' && vote.voteState !== '') || isShowVotePubPanel) && (
            <YSDrag bounds=".modules" handle=".vote-header">
              <Vote />
            </YSDrag>
          )}
          {!['', 'disable'].includes(answer.answerState) && (
            <YSDrag bounds=".modules" handle=".answer-header">
              <Answer />
            </YSDrag>
          )}
          <CountDown dragHandlers={dragHandlers} />
          {isShowUpPic && (
            <YSDrag bounds=".modules" dragHandlers={dragHandlers}>
              <UploadPictures />
            </YSDrag>
          )}
          {!['', 'disable'].includes(chat.chatState) && (
            <YSDrag bounds=".modules" handle=".chat-header" zIndex={250}>
              <Chat selectChat={selectChat} />
            </YSDrag>
          )}
        </div>
        {(maxVideo > 2 || isLiveRoom) && <StudentVideoList />}
        <MainWhiteboard />
        <ShowAlert />
        <Notification />
        <PlugCheck />
        <ModalBackdrop />
        <Responder />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectChat: state.chat.selectChat,
  countdownState: state.Modules.countDown.countDownState,
  toolsBoxState: JSON.stringify(state.Modules),
  fullScreen: state.whiteboard.isFullScreen,
  luckyState: state.Modules.luckyDraw.luckyState,
  voteState: state.Modules.vote.voteState,
  callRollState: state.Modules.callRoll.callRollState,
  answerState: state.Modules.answer.answerState,
  modalIsShow: state.common.modalIsShow,
  visible: state.common.visible,
  isShowUpPic: state.Modules.updataPicture.isShowUpPic,
  responserStatus: state.Modules.responserStatus,
  studentStreamList: state.video.studentStreamList,
  roomInfo: JSON.stringify(state.classroom.roomInfo),
});

const mapDispatchToProps = () => ({
  changeUpdatapic: data => {
    Actions.updataPicCount(data);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Section);
