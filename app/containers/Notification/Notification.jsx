import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from '@global/actions';
import './static/sass/index.scss';
import { YsGlobal } from '@global/handleGlobal';
import { translateAjax } from '@containers/Chat/service/ajax';
// eslint-disable-next-line import/named
import { emoticonToNull, getNowDate } from '@containers/Chat/utils';
import Icon from '@components/Icon';

class Notification extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      noticeDataInner: '',
    };
  }

  close() {
    this.props.setNoticeData();
  }

  translateFn() {
    if (this.state.noticeDataInner) return;
    translateAjax(emoticonToNull(this.props.noticeData.text))
      .then(res => {
        if (!res.strmsgToLanguage.length) return;
        this.setState({
          noticeDataInner: res.strmsgToLanguage,
        });
      })
      .catch(err => {
        console.warn(err);
      });
  }

  render() {
    const { noticeData, roomInfo } = this.props;
    const { noticeDataInner } = this.state;
    const { videowidth, videoheight } = JSON.parse(roomInfo);
    const scale = Number(videowidth) / Number(videoheight);
    const scaleClassName = Math.abs(scale - 4 / 3) < Math.abs(scale - 16 / 9) ? 'four-to-three' : 'sixteen-to-nine';
    return (
      <React.Fragment>
        {noticeData && noticeData.text && (
          <>
            {YsGlobal.isMobile && <p className="notice_tz_time">{getNowDate()}</p>}
            <section className={`marquee notification-wrapper ${scaleClassName}`}>
              <div className="tz_icon"></div>
              <div className="tz_inner">
                <div className="content">
                  <span> {noticeData.text}</span>
                  {noticeDataInner ? <p className="remind-msg-innerHTML">{noticeDataInner}</p> : null}
                </div>
              </div>
              {YsGlobal.isMobile && <Icon type="translate" onClick={this.translateFn.bind(this)} />}

              {!YsGlobal.isMobile && (
                <div className="tz_close">
                  <Icon type="close" onClick={this.close.bind(this)} />
                </div>
              )}
            </section>
          </>
        )}
      </React.Fragment>
    );
  }
}

Notification.propTypes = {
  noticeData: PropTypes.object,
  setNoticeData: PropTypes.func,
};

const mapStateToProps = state => ({
  noticeData: state.common.noticeData,
  roomInfo: JSON.stringify(state.classroom.roomInfo),
});

const mapDispatchToProps = () => ({
  setNoticeData: data => {
    Actions.setNoticeData(data);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
