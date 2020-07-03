/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prettier/prettier */
/* eslint-disable guard-for-in */
import React, { Component } from 'react';
import { Logger } from '@global/roomConstants';
import Actions from '@global/actions';
import { YsGlobal } from '@global/handleGlobal';
import FetchService from '@global/services/FetchService';

export default class UploadFileFrom extends Component {
  constructor() {
    super();
    this.state = {
      uploadFileParams: null,
    };
    this.isNeedUpload = false;
    this.uploadBtnType = false;
  }

  componentDidUpdate(prevProps) {

    if (prevProps.flag !== this.props.flag) {
      const input = this.i;
      input.value = '';
      input.click();
    }
    if (this.isNeedUpload) {
      this.isNeedUpload = false;
      const formData = new FormData(this.form);

      if (
        this.props.externalUploadFileCallback &&
        typeof this.props.externalUploadFileCallback === 'function' &&
        this.state.uploadFileParams
      ) {
        this.props.externalUploadFileCallback(
          formData,
          this.state.uploadFileParams.fileoldname,
          this.state.uploadFileParams.filetype,
        );
      } else {
        FetchService.uploadRoomFile(formData, (code, res) => {
          if (code === 0) {
            this.props.uploadSuccessCallback(res.filedata); 
          } else {
            Logger.warning('服务端失败');
          }
        }, ()=>{}, true);
      }
    }
    /* this.props.file(this.i,this.form) */
  }

  change(e) {
    const input = this.i;
    // eslint-disable-next-line prefer-destructuring
    const accept = this.props.accept;
    const uploadFileName = input.files[0].name;
    const fileType = uploadFileName.substring(
      uploadFileName.lastIndexOf('.') + 1,
    ).toLowerCase();
    const acceptFileTyle = `${accept.toString()}`;
    if (
      acceptFileTyle.toLowerCase().indexOf(`.${fileType}`) === -1
    ) {
      Actions.changeModalMsg({
        type: 'alert',
        message: `文件类型错误，不支持文件类型为'.${fileType}的文件！`,
      });
      return;
    }
    if (this.props.size) {
      const MAXFILESIZE = this.props.size;
      const { maxFileAlertText } = this.props;
      const fileSize = input.files[0].size;
      if (fileSize > MAXFILESIZE) {
        Actions.changeModalMsg({
          type: 'alert',
          message: maxFileAlertText || `文件大小超过限制，文件大小不能超过${MAXFILESIZE /
            1024 /
            1024}M`,
        });
        return;
      }
    }

    const uploadFileParams = FetchService.getUploadFileParams(
      uploadFileName,
      fileType,
      this.props.isWritedbFromUploadFile !== undefined
        ? this.props.isWritedbFromUploadFile
        : false,
    );

      uploadFileParams.dynamicppt = ['ppt', 'pptx'].includes(fileType) && this.props.uploadType=== 'fewUpload'? 1 : 0;
    this.isNeedUpload = true;
    this.setState({
      uploadFileParams,
    });
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    const ary = [];
    for (const i in this.state.uploadFileParams) {
      ary.push({ [i]: this.state.uploadFileParams[i] });
    }

    /* todu 没有用到的代码 */
    // const testGlobal = {
    //   isClient: false,
    //   osType: false,
    // };

    const { isPhoto } = this.props;
    return (
      <div>
        <form
          style={{ display:isPhoto? 'block' : 'none' }}
          ref={form => {
            this.form = form;
          }}
        >
          {YsGlobal.isSafari && YsGlobal.isMobile?<input
            type="file"
            ref={i => {
              this.i = i;
            }}
            onChange={this.change.bind(this)}
            name="filedata"
            accept="image/*"
            className={isPhoto?'photoImg':''}
          />:<input
            type="file"
            ref={i => {
              this.i = i;
            }}
            onChange={this.change.bind(this)}
            name="filedata"
            accept={isPhoto?"image/*" : this.props.accept
            }
            className={isPhoto?'photoImg':''}
            capture="camera"
          />}
          {ary.length > 0
            ? ary.map((item, index) => {
              let key;
              let value;
              for (const a in item) {
                key = a;
                value = item[a];
              }
              return (
                <input
                  type="text"
                  key={index}
                  name={key}
                  value={value}
                  readOnly
                />
              );
            })
            : null}
        </form>
      </div>
    );
  }
}
