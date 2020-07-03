const deviceMapping = {
  WindowPC: 'netWindowPc',
  MacPC: 'netMacPc',
  AndroidPhone: 'netAndroid',
  AndroidPad: 'netAndroidPad',
  iPhone: 'netIPhone',
  iPad: 'netIPad',
  WindowClient: 'netWindowClient',
  MacClient: 'netMacClient',
  AndroidTV: 'netAndroidTV',
  WXApplet: 'netWXApplet',
  MobileBrowser: 'MobileBrowser',
};
function deviceTypeClassNameInfo(clientDeviceVersionInfo = 'WindowPC') {
  let deviceTypeClassName = '';
  deviceTypeClassName = deviceMapping[clientDeviceVersionInfo];
  return deviceTypeClassName;
}

export default {
  deviceTypeClassNameInfo,
};
