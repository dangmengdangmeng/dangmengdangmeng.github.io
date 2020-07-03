import React from 'react';
import Icon from '@components/Icon';

/**
 * 聊天消息中图片全屏
 * @组件 FullScreenImg
 */
function FullScreenImg(props) {
  return (
    <div className="fullScreenImg">
      <div className="wrapper">
        <img src={props.imgUrl} alt="" />
        <Icon  type="close" onClick={props.closeShow} />
      </div>
    </div>
  );
}

export default FullScreenImg;
