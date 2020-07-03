import React, { useState } from 'react';

import '../styles/raiseStudent';
import { YsGlobal } from '@global/handleGlobal';

const { isMobile, languageInfo } = YsGlobal;
interface IRaiseStudentProps {
  status: 'raise' | 'default' | 'countdown'; // 举手状态
  statusChange: Function; // 修改状态
}

/**
 * 学生举手组件
 */
let handTimer: number = 0;
export default function RaiseStudent(props: IRaiseStudentProps) {
  const { status = 'default', statusChange = () => { } } = props;
  const [num, setNum] = useState(0);
  const handUp = () => {
    let countdownNum = 0;
    clearInterval(handTimer);
    handTimer = setInterval(() => {
      setNum(++countdownNum);
      if (countdownNum < 3) {
        return;
      }
      statusChange('default');
      setNum(0);
      clearInterval(handTimer);
    }, 1000);
    statusChange('countdown');
  }
  const handDown = () => {
    if (isMobile) return;
    clearInterval(handTimer);
    statusChange('raise');
  };

  const handTouchStart = (event: any) => {
    if (!isMobile) return;
    event.preventDefault();
    statusChange('raise');
  };

  // 阻止移动端长按举手会弹出菜单的问题
  const handleContextMenu = (event: any) => {
    if (!isMobile) return;
    event.preventDefault();
  };

  return <div className={`hand-student ${status}`} onMouseDown={handDown} onContextMenu={handleContextMenu} onTouchStart={handTouchStart}  onTouchEnd={handUp} onMouseUp={handUp}>
    {['raise', 'countdown'].includes(status) ? (
      <React.Fragment>
        <div className="hand-tip">{languageInfo.raisehand.langTap}</div>
        {status === 'countdown' ? 3 - num : ''}
      </React.Fragment>
    ) : ''}
  </div>;
}
