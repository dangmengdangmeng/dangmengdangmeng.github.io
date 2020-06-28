import Logger from './Logger'

export default {
    getBrowserInfo() {
        const {userAgent} = window.navigator
        const rMsie = /(msie\s|trident.*rv:)([\w.]+)/
        const rEdge = /edge\/(\d+).(\d+)$/
        const rFirefox = /(firefox)\/([\w.]+)/
        const rOpera = /(opera).+version\/([\w.]+)/
        const rChrome = /(chrome)\/([\w.]+)/
        const rCriOs = /(crios)\/([\w.]+)/
        const rSafari = /version\/([\w.]+).*(safari)/
        const uaMatch = (ua) => {
            let match = rMsie.exec(ua)
            if (match) {
                return {browser: 'ie', version: match[2] || '0'}
            }
            match = rEdge.exec(ua)
            if (match) {
                return {browser: 'edge', version: match[2] || '0'}
            }
            match = rFirefox.exec(ua)
            if (match) {
                return {browser: match[1] || 'firefox', version: match[2] || '0'}
            }
            match = rOpera.exec(ua)
            if (match) {
                return {browser: match[1] || 'opera', version: match[2] || '0'}
            }
            match = rChrome.exec(ua)
            if (match) {
                return {browser: match[1] || 'chrome', version: match[2] || '0'}
            }
            match = rCriOs.exec(ua)
            if (match) {
                return {browser: 'chrome', version: match[2] || '0'}
            }
            match = rSafari.exec(ua)
            if (match && ua.indexOf('android') === -1) {
                return {browser: match[2] || 'safari', version: match[1] || '0'}
            }
            return {browser: 'unknown', version: 'unknown'}
        }
        const browserMatch = uaMatch(userAgent.toLowerCase())
        const language = (navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || navigator.language)
        // 判断访问终端
        const browser = {
            versions: {
                edge: userAgent.indexOf('Edge') > -1, // edge内核
                trident: userAgent.indexOf('Trident') > -1, // IE内核
                presto: userAgent.indexOf('Presto') > -1, // opera内核
                webKit: userAgent.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
                gecko: userAgent.indexOf('Gecko') > -1 && userAgent.indexOf('KHTML') === -1, // 火狐内核
                mobile: !!userAgent.match(/AppleWebKit.*Mobile.*/) || userAgent.indexOf('Android') > -1 || userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1 || userAgent.indexOf('iPod') > -1 || (userAgent.indexOf('Mac') > -1 && navigator.platform === 'MacIntel' && (navigator.maxTouchPoints && navigator.maxTouchPoints > 1)), // 是否为移动终端
                ios: !!userAgent.match(/\(i[^;]+;( U;)? CPU+Mac OS X/), // ios终端
                android: userAgent.indexOf('Android') > -1, // android终端
                iPhone: userAgent.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
                iPad: userAgent.indexOf('iPad') > -1 || (userAgent.indexOf('Mac') > -1 && (navigator.platform === 'MacIntel' && navigator.maxTouchPoints && navigator.maxTouchPoints > 1)), // 是否iPad
                safari: browserMatch.browser === 'safari', // 是否是Safari
            },
            language: language ? language.toLowerCase() : undefined,
            cpuarchitecture: (userAgent.toLowerCase().indexOf('wow64') > -1 || userAgent.toLowerCase().indexOf('x64') > -1) ? 'x64' : 'x86',
            info: {
                browserName: browserMatch.browser, // 浏览器使用的版本名字
                browserVersion: browserMatch.version, // 浏览器使用的版本号
                appCodeName: navigator.appCodeName, // 返回浏览器的代码名。
                appMinorVersion: navigator.appMinorVersion, // 返回浏览器的次级版本。
                appName: navigator.appName, // 返回浏览器的名称。
                appVersion: navigator.appVersion, //	返回浏览器的平台和版本信息。
                browserLanguage: navigator.browserLanguage, //	返回当前浏览器的语言。
                cookieEnabled: navigator.cookieEnabled, //	返回指明浏览器中是否启用 cookie 的布尔值。
                cpuClass: navigator.cpuClass, //	返回浏览器系统的 CPU 等级。
                onLine: navigator.onLine, //	返回指明系统是否处于脱机模式的布尔值。
                platform: navigator.platform, //	返回运行浏览器的操作系统平台。
                systemLanguage: navigator.systemLanguage, // 返回 OS 使用的默认语言。
                userAgent: navigator.userAgent, // 返回由客户机发送服务器的 user-agent 头部的值。
                userLanguage: navigator.userLanguage, //	返回 OS 的自然语言设置。
            },
        }
        return browser
    },
    /* 返回操作系统 */
    detectOS() {
        try {
            const sUserAgent = navigator.userAgent
            const isWin = (navigator.platform === 'Win32') || (navigator.platform === 'Windows')
            const isMac = (navigator.platform === 'Mac68K') || (navigator.platform === 'MacPPC') || (navigator.platform === 'Macintosh') || (navigator.platform === 'MacIntel')
            if (isMac) return 'Mac'
            const isUnix = (navigator.platform === 'X11') && !isWin && !isMac
            if (isUnix) return 'Unix'
            const isLinux = (String(navigator.platform).indexOf('Linux') > -1)
            if (isLinux) return 'Linux'
            if (isWin) {
                const isWin2K = sUserAgent.indexOf('Windows NT 5.0') > -1 || sUserAgent.indexOf('Windows 2000') > -1
                if (isWin2K) return 'Win2000'
                const isWinXP = sUserAgent.indexOf('Windows NT 5.1') > -1 || sUserAgent.indexOf('Windows XP') > -1
                if (isWinXP) return 'WinXP'
                const isWin2003 = sUserAgent.indexOf('Windows NT 5.2') > -1 || sUserAgent.indexOf('Windows 2003') > -1
                if (isWin2003) return 'Win2003'
                const isWinVista = sUserAgent.indexOf('Windows NT 6.0') > -1 || sUserAgent.indexOf('Windows Vista') > -1
                if (isWinVista) return 'WinVista'
                const isWin7 = sUserAgent.indexOf('Windows NT 6.1') > -1 || sUserAgent.indexOf('Windows 7') > -1
                if (isWin7) return 'Win7'
                const isWin8 = sUserAgent.indexOf('Windows NT 6.2') > -1 || sUserAgent.indexOf('Windows 8') > -1
                if (isWin8) return 'Win8'
                const isWin81 = sUserAgent.indexOf('Windows NT 6.3') > -1 || sUserAgent.indexOf('Windows 8.1') > -1
                if (isWin81) return 'Win8.1'
                const isWin10 = sUserAgent.indexOf('Windows NT 10.0') > -1 || sUserAgent.indexOf('Windows 10') > -1
                if (isWin10) return 'Win10'
            }
            return 'Other'
        } catch (err) {
            Logger.error('detectOS method error:', err)
            return 'Other'
        }
    },
    version() {
        return '1.0.0'
    },
    //查看是否是 native 环境
    isNative() {
        return typeof window.roadof_window === 'function'
    },
    //获取 loading 的 icon
    getLoadingIcon() {
        return "data:image/gif;base64,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"
    }
}
