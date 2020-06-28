import utils from "../utils/utils"

class NativeVideoController {
    constructor(config) {
        this.elements = {}
        this.id = config.id
        this.elementId = config.elementId
        this.isLocal = config.isLocal
        this.type = config.type
        this.sourceId = config.sourceId
        this.streamId = config.streamId
        this.config = config
        //创建 dom 元素
        this.createElement()
    }

    playVideo() {
        return new Promise((resolve, reject) => {
            resolve()
        })
    }

    destroy() {
        const {parentDiv, container} = this.elements
        if (container && parentDiv) {
            container.removeChild(parentDiv)
        }
        this.elements = {}
    }

    //创建视频流的父级 div
    createParentElement() {
        let div = document.createElement('div')
        div.id = `native-video-player-${this.id}`
        div.setAttribute('data-local', String(this.isLocal))
        div.setAttribute('data-type', String(this.type))
        div.setAttribute('data-streamId', String(this.streamId))
        div.className = 'road-of-player'
        div.style.width = "100%"
        div.style.height = "100%"
        div.style.position = "relative"
        div.style.background = "#000"
        div.style.overflow = "hidden"

        this.elements.parentDiv = div
        return div
    }

    //创建视频容器
    createElement() {
        let parentDiv = this.createParentElement()
        let video = document.createElement('embed')
        video.id = `video-play-stream-${this.id}`
        video.className = 'road-of-stream'
        video.style.width = "100%"
        video.style.height = "100%"
        video.style.position = "absolute"
        video.style.background = "#000"

        //设置镜像
        this.setVideoMirror(video)
        //设置填充模式
        this.setVideoMode(video)
        parentDiv.appendChild(video)
        this.elements.video = video

        const maskElement = this.createMaskElement()
        parentDiv.appendChild(maskElement)

        //如果需要 loading 就展示 loading
        if (this.config.options.loader) {
            const loaderElement = this.createLoaderElement()
            parentDiv.appendChild(loaderElement)
        }

        this.elements.container = document.getElementById(this.elementId)
        //挂载到传来的 dom 元素上
        if (this.elements.container) {
            //挂载前 删除其他的元素
            let oldPlayers = this.elements.container.getElementsByClassName('road-of-player')
            if (oldPlayers.length > 0) {
                for (let i = 0; i < oldPlayers.length; i++) {
                    this.elements.container.removeChild(oldPlayers[i])
                }
            }
            this.elements.container.appendChild(this.elements.parentDiv)
        }
    }

    //创建视频流遮罩层
    createMaskElement() {
        let mask = document.createElement('div')
        mask.className = 'road-of-stream-video-mask'
        mask.style.width = "100%"
        mask.style.height = "100%"
        mask.style.pointerEvents = 'none'
        mask.style.position = "absolute"
        mask.style.background = "transparent"
        mask.style.left = "0"
        mask.style.top = "0"
        this.elements.mask = mask
        return mask
    }

    //创建loading
    createLoaderElement() {
        let loader = document.createElement('div')
        loader.id = `video-play-loader-${this.id}`
        loader.className = "road-of-load"
        loader.style.width = "35px"
        loader.style.height = "35px"
        loader.style.position = "absolute"
        loader.style.left = "50%"
        loader.style.top = "50%"
        loader.style.zIndex = "1"
        loader.style.transform = "translate(-50%,-50%)"
        loader.style.backgroundImage = `url(${utils.getLoadingIcon()})`
        loader.style.backgroundRepeat = "no-repeat"
        loader.style.backgroundPositionX = "center"
        loader.style.backgroundPositionY = "center"
        loader.style.backgroundSize = "cover"
        this.elements.loader = loader
        return loader
    }

    //设置镜像
    setVideoMirror(video) {
    }

    //设置填充模式
    setVideoMode(video) {
    }
}


export default NativeVideoController
