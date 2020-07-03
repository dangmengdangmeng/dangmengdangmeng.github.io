import React, { Component } from 'react';
import { YsGlobal } from '@global/handleGlobal';

import '../styles/Winners.scss';

const { lucky } = YsGlobal.languageInfo;
const { pubPanelInner } = lucky;
export default class Winners extends Component {
  render() {
    const { winners = [], endtime } = this.props;

    const hasWinner = winners instanceof Array && winners.length > 0;
    return (
      <div className="winners">
        <header className="winner-title">{pubPanelInner.nameList}</header>
        <div className="winner-container">
          <ul className="winner-list">
            {hasWinner &&
              winners.map(({ name, id }) => (
                <li className="winner" key={`winning_${id}`}>
                  <span>{name}</span>
                  <span>{endtime}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
