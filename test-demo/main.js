var device_array = [];
var enumerating = false;
const plugin = document.getElementById('plugin');

Initialize()

function HandleMessage(message_event) {
    console.log(message_event);
}


function onInit() {
    plugin.postMessage({
        command: 'init',
        appId: 'YuulBHYy9Cd0qNYs',
    });
    var login = document.getElementById("login");
    login.disabled = false;
    var init = document.getElementById("init");
    init.disabled = true;
}

function joinChannel() {
    plugin.postMessage({
        command: 'joinChannel',
        channelId: '987913528',
    });
    var login = document.getElementById("login");
    login.disabled = true;
}

function onGetVideoDevices() {
    plugin.postMessage({
        command: 'getVideoDevices',
    });
}

function onGetAudioRecordingDevs() {
    plugin.postMessage({
        command: 'getAudioRecordingDevices',
    });
}

function onGetAudioPlaybackDevs() {
    plugin.postMessage({
        command: 'getAudioPlaybackDevices',
    });
}

function Initialize() {
    console.log('Initialize')
    console.log('plugin-',plugin)
    plugin.addEventListener('message', HandleMessage, false);
}

// document.addEventListener('DOMContentLoaded', Initialize, false);