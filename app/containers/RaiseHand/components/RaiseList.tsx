import React from 'react';
import { YsGlobal } from '@global/handleGlobal';

import '../styles/raiseList';
import { IUser } from '@app/global/types/User';

const { raisehand } = YsGlobal.languageInfo;

interface IRaiseListProps {
  list: IUser[]; // 收到list中用户有disable属性
  upPlatform: Function;
  position: 'top' | 'bottom';
}

/**
 * 举手列表组件
 */
export default function RaiseList({ list = [], upPlatform = () => {}, position = 'bottom' }: IRaiseListProps) {
  const iconClick = (user: IUser) => !user.disable && upPlatform(user);

  const oneUser = [0, 1].includes(list.length) ? 'has-one' : '';

  // if (list.length === 0) return '';

  return (
    <div className={`hand-list ${oneUser}`}>
      <ul className={`hand-list-container ${position}`}>
        {list.length > 0 ? (
          list.map((user: IUser) => (
            <li className={`hand-item ${user.disable ? 'disable' : ''}`} key={user.nickname}>
              {user.nickname}
              <span className="hand-icon" onClick={() => iconClick(user)}></span>
            </li>
          ))
        ) : (
          <li className="hand-item">{raisehand.nobody}</li>
        )}
      </ul>
    </div>
  );
}
