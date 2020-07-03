import React from 'react';
import YsSliderDumb from '@components/slider/YsSlider';
import { YsGlobal } from '@global/handleGlobal';
import { compare } from '@utils/';
import Icon from '@components/Icon';
const { tools } = YsGlobal.languageInfo.whiteboard;
export default class ToolEraser extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (compare(this.props, nextProps)) {
      return true;
    }
    return false;
  }
  render() {
    const { openToolEraser, changeEraser, hideAllSelectBox, onAfterChangeEraserWidth, eraserDisabled, isActive, showSelectType, eraserWidth } = this.props;
    return (
      <li
        className={`tool-option tool_eraser ${eraserDisabled ? ' disabled' : ''}`}
        onClick={openToolEraser}
        title={tools.tool_eraser}
      >
        <Icon disable={eraserDisabled} active={isActive === 'tool_eraser'} type="eraser"/>
        <div
          className="tool-eraser-extend"
          style={{
            display: isActive === 'tool_eraser' && showSelectType === 'eraserPanel' ? 'block' : 'none',
          }}
          onClick={changeEraser}
          onMouseLeave={hideAllSelectBox}
        >
          <div className="tool-slider">
            <YsSliderDumb onAfterChange={onAfterChangeEraserWidth} value={eraserWidth} />
          </div>
        </div>
        {/* <em className="icon-more"></em> */}
      </li>
    );
  }
}
