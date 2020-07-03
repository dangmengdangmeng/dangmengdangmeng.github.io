import React from 'react';
import Icon from '@components/Icon';
import './gift.scss';

const Gift = props => {
  const { giftnumber } = props;

  return (
    <div className="gift-number">
      <Icon type="gift" />
      <span className="multiply">x</span>
      {giftnumber}
    </div>
  );
};

export default Gift;
