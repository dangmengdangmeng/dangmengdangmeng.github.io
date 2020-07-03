import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { YsGlobal } from '@global/handleGlobal';
import { Event, SessionRoom, PUBLISH_STATE } from '@global/roomConstants';
import Signalling from '@app/global/services/SignallingService';
import { setUserProperty } from '@utils/sign';
import store from '@app/store';

import RaiseList from './components/RaiseList';
import RaiseStudent from './components/RaiseStudent';
import RaiseTeacher from './components/RaiseTeacher';

import './styles/raise';
import { IUser } from '@app/global/types/User';
import { convert } from '@app/utils/utils';

interface IRaiseHandProps {
  studentCount: number;
  isAllNoAudio: boolean;
  onlineStudentNum: number;
  isBigRoom: boolean;
  isVideoLayout: boolean;
}

interface IRaiseHandState {
  status: 'raise' | 'default' | 'countdown';
  listShow: boolean;
  position: 'top' | 'bottom';
  raiseUsers: IUser[];
  canRaiseHand: boolean;
}

const { raisehand } = YsGlobal.languageInfo;

const mapStateToProps = (state: any) => ({
  studentCount: state.classroom.studentCount,
  isAllNoAudio: state.classroom.isAllNoAudio,
  isBigRoom: state.classroom.isBigRoom,
  onlineStudentNum: state.user.onlineStudentNum,
  isVideoLayout: state.classroom.isVideoLayout,
});

const mapDispatchToProps = () => ({});
@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class RaiseHand extends PureComponent<IRaiseHandProps, IRaiseHandState> {
  listernerBackupid: string = `${new Date().getTime()}_${Math.random()}`;

  userId: string = '';

  role: number = NaN;

  nickname: string = '';

  raiseHandId = '';

  state: IRaiseHandState = {
    status: 'default',
    listShow: false,
    position: 'top',
    raiseUsers: [],
    canRaiseHand: false,
  };

  constructor(props: IRaiseHandProps) {
    super(props);
    PUBLISH_STATE;
    Event.on('recv-pub-msg', (pubMsgData: any) => this.getHandler(pubMsgData.name)(pubMsgData), this.listernerBackupid);
    Event.on('recv-del-msg', (delMsgData: any) => this.getDelHandler(delMsgData.name)(delMsgData), this.listernerBackupid);
    Event.on('signal-connected', this.roomConnected.bind(this), this.listernerBackupid); // 房间连接成功
  }

  componentWillUnmount() {
    Signalling.subRaisehand(this.raiseHandId, true);
    Event.offAllByMarkId(this.listernerBackupid);
  }

  roomConnected() {
    const self = SessionRoom.getMyself();
    this.role = convert<number>(self.role);
    this.userId = convert<string>(self.id);
    this.nickname = convert<string>(self.nickname);
    this.state.canRaiseHand = [0, 1].includes(this.role);
    this.forceUpdate();
  }

  getHandler(name: string) {
    const handlers: {
      [propName: string]: any;
    } = {
      ClassBegin: ({ ts: beginTime, isNowMsg }: any) => {
        if (this.role !== 0 || !isNowMsg) return;
        Signalling.sendStartRaisehand(beginTime);
      },
      RaiseHandStart: ({ id }: any) => {
        this.raiseHandId = id;
        if (this.role === 2) {
          this.setState({
            canRaiseHand: true,
          });
        } else if ([0, 1].includes(this.role)) {
          Signalling.subRaisehand(id);
        }
      },
      Server_Sort_Result: (pubMsgData: any) => {
        const { extraData, id } = pubMsgData;
        const { sortResult } = extraData;
        if (![0, 1].includes(this.role) || id.substr(7) !== this.raiseHandId) return;
        this.refreshRaiseUsers(sortResult.map((idObj: any) => idObj));
      },
    };
    return handlers[name] || (() => {});
  }

  getDelHandler(name: string) {
    const handlers: {
      [propName: string]: any;
    } = {
      ClassBegin: () => {
        if (![0, 1].includes(this.role)) return;
        Signalling.subRaisehand(this.raiseHandId, true);
      },
    };
    return handlers[name] || (() => {});
  }

  /**
   * 刷新学生列表
   */
  refreshRaiseUsers(raiseUsers: IUser[]) {
    if (this.props.isBigRoom) raiseUsers = raiseUsers.map(user => this.getUserRaise({ id: Object.keys(user)[0], nickname: Object.values(user)[0] }, SessionRoom.getUsers()));
    else raiseUsers = raiseUsers.map(user => this.getUserRaise(SessionRoom.getUser(Object.keys(user)[0]))); // 所有用户
    
    // raiseUsers = raiseIds.map(user => this.getUserRaise(user), this.props.isBigRoom);
    const listShow = raiseUsers.length === 0 ? false : this.state.listShow;
    this.setState({
      raiseUsers,
      listShow,
    });
  }

  /**
   * 获取列表用的用户对象数组
   * @param {IUser} user user对象
   * @param {IUser[]} upPlatformUsers 大教室的台上用户
   */
  getUserRaise({ id, publishstate, nickname }: IUser, upPlatformUsers?: { [userId: string]: IUser }) {
    if (upPlatformUsers && Object.keys(upPlatformUsers).includes(id)) publishstate = upPlatformUsers[id].publishstate || PUBLISH_STATE.NONE;
    publishstate = publishstate || PUBLISH_STATE.NONE;
    return {
      id,
      nickname,
      disable: publishstate !== PUBLISH_STATE.NONE,
      publishstate,
    };
  }

  /**
   * 修改学生举手状态，角色为学生时用
   * @param {'raise' | 'default' | 'countdown'} status 学生举手状态
   */
  raiseStatusChange(status: 'raise' | 'default' | 'countdown') {
    this.setState(
      {
        status,
      },
      () => {
        Signalling.sendRaisehand(this.userId, this.nickname, this.raiseHandId, this.state.status === 'default');
        setUserProperty(this.userId, { raisehand: this.state.status !== 'default' });
      },
    );
  }

  /**
   * 更新举手列表显隐状态
   */
  listStatusChange() {
    this.setState({
      listShow: !this.state.listShow,
    });
  }

  /**
   * 学生上台
   * @param {user} IUser 学生对象
   */
  upPlatform(user: IUser) {
    if (user.publishstate !== PUBLISH_STATE.NONE) return;
    const students = convert<IUser>(Object.values(SessionRoom.getUsers()))
      .filter((u: IUser) => u.role === 2)
      .filter((u: IUser) => 0 !== u.publishstate);
    const { maxVideo } = store.getState().classroom.roomInfo;
    if (students.length >= maxVideo - 1) {
      // eslint-disable-next-line no-alert
      alert(raisehand.full);
      return;
    }
    setUserProperty(user.id, { publishstate: this.props.isAllNoAudio ? PUBLISH_STATE.VIDEOONLY : PUBLISH_STATE.BOTH });
  }

  /**
   * 学生render
   */
  student() {
    const { status, position, canRaiseHand } = this.state;
    const { isVideoLayout } = this.props;
    if (!canRaiseHand) return '';
    return (
      <div className={`raise-hand ${position} ${YsGlobal.isMobile && 'mobile-raise-hand'} ${isVideoLayout?'videoLayout-raise-hand':''}`}>
        <RaiseStudent status={status} statusChange={this.raiseStatusChange.bind(this)} />
      </div>
    );
  }

  /**
   * 老师render
   */
  teacher() {
    const { listShow, position, raiseUsers } = this.state;
    const { onlineStudentNum, isBigRoom, studentCount, isVideoLayout } = this.props;
    return (
      <div className={`raise-hand ${position} ${isVideoLayout?'videoLayout-raise-hand':''}`}>
        <RaiseTeacher
          count={isBigRoom && onlineStudentNum ? onlineStudentNum : studentCount}
          raiseNum={raiseUsers.length}
          onClick={this.listStatusChange.bind(this)}
        />
        {listShow && <RaiseList list={raiseUsers} upPlatform={this.upPlatform.bind(this)} position={position} />}
      </div>
    );
  }

  render() {
    if ([0, 1].includes(this.role)) return this.teacher();
    if (this.role === 2) return this.student();
    return '';
  }
}
