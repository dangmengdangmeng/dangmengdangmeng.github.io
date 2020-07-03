import React from 'react';
// import YsGlobal from "YsGlobal";
import ColorPicker from '@components/ColorPicker/ColorPicker';
import YsSliderDumb from '@components/slider/YsSlider';
import { YsGlobal } from '@global/handleGlobal';
import { compare } from '@utils/';
import Icon from '@components/Icon';
const { tools } = YsGlobal.languageInfo.whiteboard;
export default class ToolShapeList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (compare(this.props, nextProps)) {
      return true;
    }
    return false;
  }

  shapeActive(value) {
    const checkArr = ['tool_rectangle_empty', 'tool_rectangle', 'tool_ellipse_empty', 'tool_ellipse'];
    return checkArr.indexOf(value) !== -1 ? value : '';
  }

  render() {
    const {
      showShapeList,
      showSelectType,
      changeShape,
      hideAllSelectBox,
      setLineColor,
      onAfterChangeShapeLineWidth,
      shape,
      isActive,
      primaryColor,
      shapeWidth,
    } = this.props;

    return (
      <li
        className={`tool-option shape-list ${shape}`}
        data-current-shape={shape}
        onClick={showShapeList}
        title={tools.tool_shape}
      >
        <Icon active={isActive === this.shapeActive(shape)} type="rect"/>
        <div
          className="tool-shape-list-extend"
          style={{
            display: showSelectType === 'shapePanel' && isActive === this.shapeActive(shape) ? 'block' : 'none',
          }}
          onClick={changeShape}
          onMouseLeave={hideAllSelectBox}
        >
          <div className="tool-shape-container">
            <Icon data-type="tool_rectangle_empty" active={isActive === 'tool_rectangle_empty'} type="rectangle_rim" />
            <Icon data-type="tool_rectangle" active={isActive === 'tool_rectangle'} type="rectangle_tool" />
            <Icon data-type="tool_ellipse_empty" active={isActive === 'tool_ellipse_empty'} type="roundness_rim" />
            <Icon data-type="tool_ellipse" active={isActive === 'tool_ellipse'} type="roundness" />
          </div>
          <div className="tool-slider">
            <YsSliderDumb value={shapeWidth} onAfterChange={onAfterChangeShapeLineWidth} />
          </div>
          <div style={{ position: 'relative', borderTop: '1px solid #DEEAFF', marginLeft: '10px' }}>
            <ColorPicker setLineColor={setLineColor} selectColor={primaryColor} />
          </div>
        </div>
        {/* <em className="icon-more"></em> */}
      </li>
    );
  }
}
