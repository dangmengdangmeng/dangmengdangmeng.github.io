/** 课件库（包含头部排序工具条）
 * 目前普通文件和媒体文件未区分
 * 拓展：通过拆分fileList区分文件
 */
import React, { useState } from 'react';
import { YsGlobal } from '@global/handleGlobal';
import FileListHeader from './FileListHeader';
import FileItem from './fileItem';
import FileProgressBar from './fileProgressBar';
import DynamicPPT from './DynamicPPT';

export default props => {
  const [state, setState] = useState({
    fileType: null,
    uploadFileFromFlag: 0, // 上传文件的flag
    courseDisabled: false,
    uploadType: 'upLoadMore',
  });
  const [statePPT, setStatePPT] = useState({
    fileType: null,
    uploadFileFromFlag: 0, // 上传文件的flag
    courseDisabled: false,
    uploadType: 'upLoadMore',
  });
  /**
   * 调用底层sdk删除课件的方法
   * @params {string} type   'course'
   */
  const handleAdd = (type, upLoadT) => {
    if (upLoadT === 'upLoadMore') {
      setState({
        ...state,
        ...{
          fileType: type,
          uploadFileFromFlag: state.uploadFileFromFlag + 1,
          uploadType: upLoadT,
        },
      });
    } else if (upLoadT === 'fewUpload') {
      setStatePPT({
        ...state,
        ...{
          fileType: type,
          uploadFileFromFlag: statePPT.uploadFileFromFlag + 1,
          uploadType: upLoadT,
        },
      });
    }
  };
  /**
   * 更改上传课件按钮的disabled
   */
  const clickDisable = () => {
    setState({
      ...state,
      ...{
        courseDisabled: false,
      },
    });
  };
  /**
   * 更改上传课件按钮的disabled
   */
  const clickEffect = isMedia => {
    setState({
      ...state,
      ...{
        courseDisabled: !isMedia,
      },
    });
  };
  const { fileType, uploadFileFromFlag, courseDisabled, uploadType } = state;
  const hasWBFile = !YsGlobal.roomConfigItem.isMoreWhiteboard;
  return (
    <React.Fragment>
      <FileListHeader fileList={props.fileList} courseDisabled={courseDisabled} handleAdd={handleAdd} />
      <div className="fileContainer">
        <DynamicPPT
          clickDisable={clickDisable}
          clickEffect={clickEffect}
          {...props}
          uploadFileFromFlag={statePPT.uploadFileFromFlag}
          fileType={statePPT.fileType}
          uploadType={statePPT.uploadType}
        />
        <FileProgressBar
          clickDisable={clickDisable}
          clickEffect={clickEffect}
          {...props}
          uploadFileFromFlag={uploadFileFromFlag}
          fileType={fileType}
          uploadType={uploadType}
        />
        {/** 白板 */}
        {hasWBFile && <FileItem openFile={props.openFileList[0]} key={props.whiteBoard.fileid} file={props.whiteBoard} setOpenFile={props.setOpenFile} />}
        {/** 课件库 */}
        {props.fileList.map(file => (
          <FileItem openFile={props.openFileList[file.fileid]} key={file.fileid} file={file} setOpenFile={props.setOpenFile} />
        ))}
      </div>
    </React.Fragment>
  );
};
