/**
 * @module NativeController
 * @description 客户端的主类 用于获取 cef 相关的内容
 * @author 党萌
 * @time 2020-06-19
 * **/

class NativeController {
    constructor() {
        this.rendererInstance = null
        this.signalInstance = null
    }

    /**
     * @description 初始化*/
    init() {
        const nativeInfo = this.getClient()

        if (nativeInfo) {
        }
    }

    listenNativeCallback() {
        this.rendererInstance.addEventListener('message', function (message) {
            console.log('listenNativeCallback', message)
        }, false)
    }

    //获取 cef的全局变量
    getClient() {
        return window.roadof_window || null
    }

    /**
     * @description 获取客户端实例**/
    getRendererInstance() {
        let rendererInstance = document.getElementById('ys-native')

        if (!rendererInstance) {
            rendererInstance = document.createElement("embed")
            rendererInstance.setAttribute("id", "ys-native")
            rendererInstance.setAttribute("type", "application/x-ppapi-sdk_proxy")
            rendererInstance.setAttribute("mode", "renderer")
        }
        this.rendererInstance = rendererInstance
        this.listenNativeCallback()
    }

    getSignalInstance() {
        let signalInstance = document.getElementById('ys-native')

        if (!signalInstance) {
            signalInstance = document.createElement("embed")
            signalInstance.setAttribute("id", "ys-native-signal")
            signalInstance.setAttribute("type", "application/x-ppapi-sdk_proxy")
            signalInstance.setAttribute("mode", "signal")
        }
        this.signalInstance = signalInstance
    }
}


export default NativeController
