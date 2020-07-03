interface signalParam {
  isDelMsg?: boolean;
  name: string;
  signalId?: string;
  id?: string;
  data?: any;
  toId?: '__all' | '__allExceptSender' | '__none' | '__allSuperUsers' | '__group' | '__groupExceptSender' | string;
  toID?: '__all' | '__allExceptSender' | '__none' | '__allSuperUsers' | '__group' | '__groupExceptSender' | string;
  isSave?: boolean;
  save?: boolean;
  expiresabs?: number;
  associatedMsgID?: string;
  associatedUserID?: string;
  type?: string;
  write2DB?: boolean;
  actions?: any;
  modify?: number;
}
export const sendSignalling: (params: signalParam) => void;

export const sendTextMessage: (message: any, toId: string, isToSender?: boolean) => void;

/* 改变用户属性
 * @params id:用户id , String/Json 【注：如果id是String类型则表述某个人的id,如果id是Json类型，则{ids:[user1Id,user2Id]}表示批量改变某批人的用户属性，ids的value为数组（放要改变者的userid）,若{roles:[role1,role2]}表示改变某些角色的用户属性，roles的value为数组（放要改变用户属性的角色）】
 * @params toID:发送给谁( __all , __allExceptSender , userid , __none ,__allSuperUsers) , String
 * @params properties:需要改变的用户属性 , Json
 * 备注：指定用户会收到事件room-userproperty-changed */
export const setUserProperty: (id: string | { ids: string[] }, properties: any, toId?: string) => void;
