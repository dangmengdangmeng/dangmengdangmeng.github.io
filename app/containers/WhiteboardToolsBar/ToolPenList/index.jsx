import React from 'react';
import ColorPicker from '@components/ColorPicker/ColorPicker';
import YsSliderDumb from '@components/slider/YsSlider';
import { YsGlobal } from '@global/handleGlobal';
import { compare } from '@utils/';
import Icon from '@components/Icon';
const { tools } = YsGlobal.languageInfo.whiteboard;
export default class ToolPenList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (compare(this.props, nextProps)) {
      return true;
    }
    return false;
  }

  penActive(value) {
    const checkArr = ['tool_pencil', 'tool_highlighter', 'tool_line', 'tool_arrow'];
    return checkArr.indexOf(value) !== -1 ? value : '';
  }

  render() {
    const {
      showPenList,
      showSelectType,
      changePen,
      hideAllSelectBox,
      setLineColor,
      onAfterChangePenLineWidth,
      pen,
      isActive,
      primaryColor,
      penWidth,
    } = this.props;

    return (
      <li className={`tool-option pen-list ${pen}`} data-current-pen={pen} onClick={showPenList} title={tools.tool_pen}>
        <Icon active={isActive === this.penActive(pen)} type="pencil_point" />
        <div
          className="tool-pen-list-extend "
          style={{
            display: showSelectType === 'penPanel' && isActive === this.penActive(pen) ? 'block' : 'none',
          }}
          onClick={changePen}
          onMouseLeave={hideAllSelectBox}
        >
          <div className="tool-pen-box">
            <Icon data-type="tool_pencil" active={pen === 'tool_pencil'} type="pen" />
            <Icon data-type="tool_highlighter" active={pen === 'tool_highlighter'} type="mark_pen" />
            <Icon data-type="tool_line" active={pen === 'tool_line'} type="line" />
            <Icon data-type="tool_arrow" active={pen === 'tool_arrow'} type="line" />
          </div>
          <div className="tool-slider">
            <YsSliderDumb value={penWidth} onAfterChange={onAfterChangePenLineWidth} />
          </div>

          <div style={{ position: 'relative', borderTop: '1px solid #DEEAFF', marginLeft: '10px' }}>
            <ColorPicker setLineColor={setLineColor} selectColor={primaryColor} />
          </div>

        </div>
        {/* <em className="icon-more" /> */}
      </li>
    );
  }
}
