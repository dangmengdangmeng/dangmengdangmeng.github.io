import React from 'react';

import '../styles/raiseTeacher';

interface IRaiseTeacherProps {
  count: number;
  raiseNum: number;
  onClick: Function;
}

/**
 * 学生老师举手组件
 */
export default function RaiseTeacher(props: IRaiseTeacherProps) {
  const { count = 0, raiseNum = 0, onClick = () => {} } = props;
  const status = raiseNum > 0 ? '' : 'disable';
  const handClick = () => typeof onClick === 'function' && onClick();
  return (
    <div className={`hand-teacher ${status}`}>
      <div className="hand-btn" onClick={handClick}></div>
      <div className="hand-count">
        {raiseNum} / {count}
      </div>
    </div>
  );
}
