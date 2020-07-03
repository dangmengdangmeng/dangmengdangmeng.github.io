/* eslint-disable react/button-has-type */
/** 课件库 头部 */
import React, { useState } from 'react';
import { SessionRoom, ROOM_ROLE } from '@global/roomConstants';
import { YsGlobal } from '@global/handleGlobal';
import store from '@app/store';

const { courseList } = YsGlobal.languageInfo;
const { fileFilterInner, dynamicPPT } = courseList;
export default ({ fileList, courseDisabled, handleAdd }) => {
  const mySelf = SessionRoom.getMyself() || {};
  const [remind, setremind] = useState(false);
  const [showWrong, setshowWrong] = useState(false);
  const goUpload = () => {
    if (remind) {
      localStorage.setItem('remind', JSON.stringify(true));
    }
    handleAdd('course', 'fewUpload');
    setshowWrong(false);
  };
  const setShowRemindDialog = () => {
    if (JSON.parse(localStorage.getItem('remind'))) {
      handleAdd('course', 'fewUpload');
    } else {
      setshowWrong(true);
    }
  };
  return (
    <div className="fileFilter">
      <span className="file-num">{`${fileFilterInner.courseware}(${YsGlobal.roomConfigItem.isMoreWhiteboard ? fileList.length : fileList.length + 1})`}</span>
      {showWrong && (
        <div className="promptbox_ppt">
          <p
            className="promptbox_ppt_close"
            onClick={() => {
              setshowWrong(false);
            }}
          >
            ×
          </p>
          <div className="text_wrong_ppt">
            <span>{dynamicPPT.attentionP}</span>
            <span>{dynamicPPT.one}</span>
            <span>{dynamicPPT.two}</span>
          </div>
          <div className="wrang_bottom_btn">
            <p></p>
            <button onClick={() => goUpload()}>{dynamicPPT.continue}</button>
            <p
              onClick={() => {
                setremind(!remind);
              }}
            >
              <span className={`${remind ? 'checked' : ''}`}></span>
              {dynamicPPT.noremind}
            </p>
          </div>
        </div>
      )}
      {mySelf.role !== ROOM_ROLE.STUDENT && (
        <div className="btn-box">
          <button
            className="addPPTCourse"
            onClick={() => setShowRemindDialog()}
            disabled={store.getState().file.uploadingPPT || store.getState().file.isCurrentUpFile_ppt}
          >
            + {dynamicPPT.addppt}
          </button>
          <button className="addCourse" onClick={() => handleAdd('course', 'upLoadMore')} disabled={courseDisabled}>
            + {fileFilterInner.fileAdd}
          </button>
        </div>
      )}
    </div>
  );
};
