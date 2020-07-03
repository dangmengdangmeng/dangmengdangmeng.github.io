import React from 'react';
import '@styles/Icon';

export default function Icon(props) {
  const { className = '', title, type, warn = false, disable = false, onClick = () => {}, active = false, realTitle = '', ...other } = props;

  const state = [className];
  if (warn) state.push('warn');
  if (disable) state.push('disable');
  if (active) state.push('active');

  if (title) {
    return (
      <div className={state.concat(['icon-area']).join(' ')} onClick={onClick} title={realTitle} {...other}>
        <i className={`iconfont icon-${type}`}></i>
        <span className="icon-tit">{title}</span>
      </div>
    );
  }
  return <i className={state.concat(['iconfont', `icon-${type}`]).join(' ')} onClick={onClick} title={realTitle} {...other}></i>;
}
