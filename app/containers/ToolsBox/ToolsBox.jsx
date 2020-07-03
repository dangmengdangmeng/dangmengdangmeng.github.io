import React from 'react';
import { connect } from 'react-redux';
import Actions from '@global/actions';
import { YsGlobal } from '@global/handleGlobal';
import ShareBtn from './component/ShareBtn';
import CallRollBtn from './component/CallRollBtn';
import AnswerBtn from './component/AnswerBtn';
import LuckDrawBtn from './component/LuckDrawBtn';
import VoteBtn from './component/VoteBtn';
import NoticeBoardBtn from './component/NoticeBoardBtn';
import NoticeInformBtn from './component/NoticeInformBtn';
import TeacherCountDownBtn from './component/TeacherCountDown';
import ResponderBtn from './component/ResponderBtn';
import './toolsBox.scss';
const {
  toUpdata,
  pagesText: { navBarInner },
} = YsGlobal.languageInfo;
const ToolsBox = props => {
  const { luckyState, voteState, voteRecordsLen, callRollState, toolsBoxInfo, answerState, answerData, countdownState, responserStatus, hasShare } = props;
  const {
    hasShareBtn,
    hasCallRollBtn,
    hasLuckDrawBtn,
    hasVoteBtn,
    hasNoticeBoardBtn,
    hasNoticeInformBtn,
    hasUpDataPicture,
    hasAnswerBtn,
    hasTeacherCountDownBtn,
    hasResponderBtn,
  } = JSON.parse(toolsBoxInfo);
  // 上传图片
  const handleUploadPictrues = () => {
    if (props.isShowUpPic) return;
    props.changeUpdatapic(true);
  };
  return (
    <div className={`tools-box ${props.isSupportPageTrun ? 'top0' : ''} ${hasShare ? 'has-share' : ''}`}>
      <span className="triangle"></span>
      <span className="tools-box-title">{navBarInner.tools}</span>
      <ul className="tools-box-list">
        {hasShareBtn && <ShareBtn />}
        {hasCallRollBtn && <CallRollBtn callRollState={callRollState} voteState={voteState} />}
        {hasAnswerBtn && <AnswerBtn answerState={answerState} answerData={answerData} />}
        {hasLuckDrawBtn && <LuckDrawBtn luckyState={luckyState} callRollState={callRollState} voteState={voteState} />}
        {hasVoteBtn && <VoteBtn voteRecordsLen={voteRecordsLen} voteState={voteState} callRollState={callRollState} />}
        {/* 计时器 */}
        {hasTeacherCountDownBtn && <TeacherCountDownBtn countdownState={countdownState} />}

        {hasNoticeBoardBtn && <NoticeBoardBtn />}
        {hasNoticeInformBtn && <NoticeInformBtn />}
        {hasResponderBtn && <ResponderBtn responserStatus={responserStatus} />}
        {hasUpDataPicture ? (
          <li onClick={handleUploadPictrues}>
            <i className="iconfont icon-upload" />
            {toUpdata.upLoadPicture}
          </li>
        ) : null}
      </ul>
    </div>
  );
};
const mapStateToProps = state => {
  const { Modules, common } = state;
  return {
    hasShare: common.screenShare.hasShare,
    answerState: Modules.answer.answerState,
    answerData: JSON.stringify(Modules.answer.answerData),
    countdownState: Modules.countDown.countDownState,
    callRollState: Modules.callRoll.callRollState,
    luckyState: Modules.luckyDraw.luckyState,
    voteState: Modules.vote.voteState,
    voteRecordsLen: Modules.vote.voteData.voteRecordList.length,
    isShowUpPic: Modules.updataPicture.isShowUpPic,
    responserStatus: Modules.responserStatus,
  };
};

const mapDispatchToProps = () => ({
  changeUpdatapic: data => {
    Actions.updataPicCount(data);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ToolsBox));
