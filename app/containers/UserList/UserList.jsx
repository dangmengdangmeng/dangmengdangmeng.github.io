/**
 * @description 花名册
 */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Event, SessionRoom, DeviceManager } from '@global/roomConstants';
import Actions from '@global/actions';
import FetchService from '@global/services/FetchService';
import WhiteboardService from '@global/services/WhiteboardService';
import DeviceService from '@global/services/DeviceService';
import Signalling from '@global/services/SignallingService';
import { YsGlobal } from '@global/handleGlobal';
import Pagitation from './components/Pagitation';
import Serverlist from './components/ServiceList';
import DocAddress from './components/DocAddress';
import DeviceManagement from './components/DeviceManagement';
import UserListSearch from './components/UserListSearch';
import ReloadDocument from './components/ReloadDocument';
import { setUserProperty } from '../../utils/sign';
import './static/Sass/index.scss';

import NameList from './NameList';

let timerInter = null;
const { userListInner } = YsGlobal.languageInfo;
const { navBarInner } = YsGlobal.languageInfo.pagesText;
const pigeSize = 10;

const UserListSmart = props => {
  const { show, userListData, onlineStudentNum, isBigRoom, updateDeviceList } = props;
  const teachersNum = userListData.filter(it => it.role === 0 || it.role === 1 || it.role === 4).length;
  const { isLiveRoom, isClassRoom } = JSON.parse(props.roomInfo);
  const mySelf = SessionRoom.getMyself() || {};
  const [list, setList] = useState([]);
  const [pageSum, setPageSum] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVal, setSearchVal] = useState('');
  const [serverList, setServerList] = useState([]); // 服务器列表
  const [showServerlist, setShowServerlist] = useState(false); // 是否显示信令线路
  const [selected, setSelected] = useState(''); // 选中的serviceName
  const [mediaList, setMediaList] = useState([]); // 服务器列表
  const [showMediaList, setShowMediaList] = useState(false); // 是否显示媒体线路
  const [mediaSelected, setMediaSelected] = useState(''); // 选中的serviceName
  const [docs, setDocs] = useState([]); // 课件服务器列表
  const [showDocAddress, setShowDocAddress] = useState(false); // 是否显示课件服务器
  const [address, setAddress] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [devicesData, setDevicesData] = useState({});
  const [showDeviceManagement, setShowDeviceManagement] = useState(false);
  const [totalsdu, setTotalstu] = useState(0);
  const [showCourseList, setShowCourseList] = useState(false);
  /* 处理用户属性改变 publishstate */
  useEffect(() => {
    /* 处理用户属性改变 */
    const userPropertiesUpdate = data => {
      const { properties } = data;
      for (const [key] of Object.entries(properties)) {
        switch (key) {
          case 'publishstate':
            if (isClassRoom && !isBigRoom) {
              setList(userListData);
            }
            break;
          default:
            break;
        }
      }
    };
    const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    Event.on('user-properties-update', userPropertiesUpdate, listernerBackupid); // 用户属性改变
    return () => {
      Event.offAllByMarkId(listernerBackupid);
    };
  }, [userListData]);
  useEffect(() => {
    const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    const handlePubMsg = pubMsgData => {
      switch (pubMsgData.name) {
        case 'RemoteControl':
          setTimeout(() => {
            window.location.reload();
          }, 200);
          break;
        // case 'UserAreaSelection':
        //   localStorage.setItem('serverName', pubMsgData.data.selected);
        //   liveRoom.switchServer(pubMsgData.data.selected);
        //   break;
        case 'UserMediaLine':
          localStorage.setItem('mediaLine', pubMsgData.data.selected);
          break;
        case 'UseCndLine':
          WhiteboardService.getYsWhiteBoardManager().switchDocAddress(pubMsgData.data.address);
          break;
        case 'getRemoteControlDevice':
          DeviceManager.getDevices(devicesInfo => {
            Signalling.sendSignallingRemoteControlDeviceManagement(pubMsgData.fromID, devicesInfo);
          });
          break;
        case 'RemoteControlCourseware':
          WhiteboardService.getYsWhiteBoardManager().reloadCurrentDocument(pubMsgData.data.instanceId);
          break;
        case 'remoteControlDeviceManagement':
          setDevicesData(pubMsgData.data);
          setShowDeviceManagement(true);
          setShowServerlist(false);
          setShowDocAddress(false);
          setCurrentUser(pubMsgData.fromID);
          break;
        case 'setRemoteControlDevice':
          updateDeviceList({ useDevices: pubMsgData.data.deviceIdMap });
          DeviceService.setDevices({ selectDeviceInfo: pubMsgData.data.deviceIdMap });
          break;
        default:
          break;
      }
    };
    Event.on('recv-pub-msg', handlePubMsg, listernerBackupid);
    return () => {
      Event.offAllByMarkId(listernerBackupid);
    };
  }, []);

  useEffect(() => {
    if (show && !searchVal) {
      clearInterval(timerInter);
      if (isBigRoom) {
        const searchRole = mySelf.role === 0 ? [1, 2] : [0, 1, 2];
        const _teachersNum = mySelf.role === 0 ? teachersNum - 1 : teachersNum;
        FetchService.getRoomUsers(
          (users, total) => {
            // console.error(searchVal, users);
            setTotalstu(total - _teachersNum);
            setList(users.filter(it => it.role !== 88));
            setPageSum(Math.ceil(total / pigeSize, 10));
          },
          (currentPage - 1) * pigeSize,
          pigeSize,
          searchRole,
        );
        timerInter = setInterval(() => {
          FetchService.getRoomUsers(
            (users, total) => {
              // console.error(searchVal, users);
              setTotalstu(total - _teachersNum);
              setList(users.filter(it => it.role !== 88));
              setPageSum(Math.ceil(total / pigeSize, 10));
            },
            (currentPage - 1) * pigeSize,
            pigeSize,
            searchRole,
          );
        }, 2000);
      } else {
        setList(userListData);
        setTotalstu(userListData.length - teachersNum);
        setPageSum(1);
      }
    }
    return () => {
      clearInterval(timerInter);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, userListData, show, isBigRoom, searchVal, teachersNum]);

  // 分组过滤，然后拼接
  // const groupBy = _list => {
  //   const _teacher = _list.filter(it => it.role === 0);
  //   const _assistants = _list.filter(it => it.role === 1);
  //   const _upStadent = _list.filter(it => it.role === 2 && it.publishstate !== 0);
  //   const _downStadent = _list.filter(it => it.role === 2 && it.publishstate === 0);
  //   const groupList = [].concat(_teacher, _assistants, _upStadent, _downStadent);
  //   return groupList;
  // };

  // 关闭花名册以后，课件服务器和设备管理都消失
  useEffect(() => {
    if (!show) {
      setShowServerlist(false);
      setShowDocAddress(false);
      setShowDeviceManagement(false);
    }
  }, [show]);
  // 翻页
  const changPage = num => {
    // console.error('isBigRoom- searchVal', isBigRoom, searchVal);
    clearInterval(timerInter);
    if (show) {
      if (isBigRoom && searchVal) {
        FetchService.getRoomUsers(
          (users, total) => {
            // console.error('翻页', users);
            setTotalstu(total - teachersNum);
            setList(users.slice((num - 1) * pigeSize, num * pigeSize));
            setCurrentPage(num);
            setPageSum(Math.ceil(total / pigeSize, 10));
          },
          0,
          pigeSize,
          [0, 1, 2],
          () => {
            console.error('error');
          },
          searchVal,
          [],
        );
      } else {
        const searchList = userListData.filter(item => item.nickname.includes(searchVal));
        setList(searchList.slice((num - 1) * pigeSize, (num - 1) * pigeSize + pigeSize));
        setCurrentPage(num);
      }
    }
  };

  // 搜索
  const search = val => {
    clearInterval(timerInter);
    setSearchVal(val);
    if (isBigRoom) {
      const searchRole = mySelf.role === 0 ? [1, 2] : [0, 1, 2];
      FetchService.getRoomUsers(
        (users, total) => {
          // console.error(val, users);
          setList(users.filter(it => it.role !== 88).slice(0, pigeSize));
          setCurrentPage(1);
          setPageSum(Math.ceil(total / pigeSize, 10));
        },
        0,
        pigeSize,
        searchRole,
        () => {
          console.error('error');
        },
        val,
        [],
      );
    } else {
      const searchList = userListData.filter(item => item.nickname.includes(val) && (mySelf.role !== 0 || item.role !== 0));
      setList(searchList);
      setPageSum(1);
      setCurrentPage(1);
    }
  };
  // 信令线路
  const handlerUserAreaSelection = async user => {
    setCurrentUser(user);
    FetchService.getServiceList(user, _list => {
      const serverarealist = [];
      for (const value of Object.values(_list)) {
        serverarealist.push(value);
      }
      setServerList(serverarealist);
      setShowServerlist(true);
      setShowDocAddress(false);
      setShowDeviceManagement(false);
      setSelected(user.servername);
    });
  };

  // 关闭信令线路
  const closeOptimalServer = () => {
    setShowServerlist(false);
  };

  const selectServer = serverareaname => {
    setSelected(serverareaname);
  };

  // 确定按钮切换网络
  const onOk = () => {
    if (currentUser.servername !== selected) {
      setUserProperty(currentUser.id, { servername: selected });
      Signalling.sendSignallingUserAreaSelection(currentUser.id, { selected });
    }
    setShowServerlist(false);
  };

  // 媒体线路
  const handlerUseMediaLine = async user => {
    setCurrentUser(user);
    FetchService.getServiceList(user, _list => {
      const serverarealist = [];
      for (const value of Object.values(_list)) {
        serverarealist.push(value);
      }
      setMediaList(serverarealist);
      setShowMediaList(true);
      setShowServerlist(false);
      setShowDocAddress(false);
      setShowDeviceManagement(false);
      setMediaSelected(user.medialine);
    });
  };

  // 关闭媒体线路
  const closeOptimalMedia = () => {
    setShowMediaList(false);
  };

  const selectMedia = serverareaname => {
    console.error('===> selectMedia: ', serverareaname);
    setMediaSelected(serverareaname);
  };

  // 确定按钮切换网络
  const onMediaOk = () => {
    if (currentUser.medialine !== mediaSelected) {
      setUserProperty(currentUser.id, { medialine: mediaSelected });
      Signalling.sendSignallingMediaLine(currentUser.id, { selected: mediaSelected });
    }
    setShowMediaList(false);
  };

  // 课件服务器
  const handlerUseCndLine = async user => {
    setCurrentUser(user);
    const res = await FetchService.getAllCndIp();
    setDocs(res);
    setShowDocAddress(true);
    setShowServerlist(false);
    setShowDeviceManagement(false);
  };

  // 确定按钮切换cdn
  const onOkAddress = () => {
    if (!address) return;
    Signalling.sendSignallingUseCndLine(currentUser.id, { address });
    setShowDocAddress(false);
  };
  const students = () => {
    if (isLiveRoom) {
      return onlineStudentNum;
    }
    return totalsdu;
  };
  const closeCourseList = () => {
    setShowCourseList(false);
  };
  const openCourseList = user => {
    setCurrentUser(user);
    setShowCourseList(true);
  };
  return (
    <div className={`userlist-container ${!isLiveRoom ? 'calssWith' : 'liveWidth'}`} onClick={e => e.stopPropagation()}>
      <span className="triangle"></span>
      <div className="userlist-title">
        <span>{isLiveRoom ? navBarInner.userList : userListInner.roster}</span>
        <div className="userlist-title-search">
          {(mySelf.role === 1 || mySelf.role === 0) && <UserListSearch search={search} />}
          <span className="student-count">{`${userListInner.studentCount}：${students()}`}</span>
        </div>
      </div>
      {/* {showServerlist && (
        <Serverlist serverList={serverList} closeOptimalServer={closeOptimalServer} selected={selected} selectServer={selectServer} onOk={onOk} />
      )} */}
      {showMediaList && (
        <Serverlist serverList={mediaList} closeOptimalServer={closeOptimalMedia} selected={mediaSelected} selectServer={selectMedia} onOk={onMediaOk} />
      )}
      {showCourseList && <ReloadDocument closeCourseList={closeCourseList} currentUser={currentUser} />}
      {showDocAddress && (
        <DocAddress
          docs={docs}
          selectAddress={domain => {
            setAddress(domain);
          }}
          address={address}
          onOk={onOkAddress}
          closeAddress={() => {
            setShowDocAddress(false);
          }}
        />
      )}
      {showDeviceManagement && (
        <DeviceManagement
          devicesData={devicesData}
          closeDevices={() => {
            setShowDeviceManagement(false);
          }}
          onOk={deviceIdMap => {
            Signalling.sendSignallingSetRemoteControlDevice(currentUser, deviceIdMap);
            setShowDeviceManagement(false);
          }}
        />
      )}
      <NameList
        userListData={list}
        handlerUserAreaSelection={handlerUserAreaSelection}
        handlerUseMediaLine={handlerUseMediaLine}
        handlerUseCndLine={handlerUseCndLine}
        openCourseList={openCourseList}
      />
      {(isLiveRoom || isBigRoom) && <Pagitation pageSum={pageSum} currentPage={currentPage} changPage={changPage} />}
    </div>
  );
};

// 需要渲染什么数据
function mapStateToProps({ user, classroom }) {
  return {
    isBigRoom: classroom.isBigRoom,
    isClassBegin: classroom.isClassBegin,
    userListData: user.userList,
    studentCount: classroom.studentCount,
    onlineStudentNum: user.onlineStudentNum,
    roomInfo: JSON.stringify(classroom.roomInfo),
  };
}

const mapDispatchToProps = dispatch => ({
  updateDeviceList: data => {
    dispatch(Actions.updateDeviceList(data));
  },
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(UserListSmart);
