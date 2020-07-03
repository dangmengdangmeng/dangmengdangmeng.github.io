import React from 'react';
import Icon from '@components/Icon';
import { YsGlobal } from '@global/handleGlobal';
const { voteCom } = YsGlobal.languageInfo;
const VoteRecordList = props => {
  const { joinVoteDetails, removeVoteRecord, listItem } = props;
  const { voteId, subject, isVoting, sendVoteUserName, sendVoteTime } = listItem;
  return (
    <>
      <div className={`record-list-item ${isVoting ? 'votingItem' : ''}`}>
        {!isVoting && (
          <div className="record-list-item_title">
            <Icon type="close" onClick={() => removeVoteRecord(voteId)} />
          </div>
        )}
        <div className="vote-info">
          <div className="vote-info_cont">
            <div className="vote-info_cont-item">
              <p className="vote-subject">{subject}</p>
              <span className="record-list-item_pattern">{listItem.pattern === 'multi' ? voteCom.hosterInner.multiple : voteCom.hosterInner.choseOne}</span>
              {isVoting && <span className="vote-status">{voteCom.hosterInner.inTheVote}</span>}
            </div>
            <p className="vote-info_cont-item">{listItem.desc}</p>
            <p className="vote-info_cont-item">
              <span className="user-name">{sendVoteUserName}</span>
              <span>{sendVoteTime}</span>
            </p>
          </div>
          <button className="vote-details" onClick={() => joinVoteDetails(listItem)}>
            {voteCom.detail}
          </button>
        </div>
      </div>
    </>
  );
};
export default VoteRecordList;
