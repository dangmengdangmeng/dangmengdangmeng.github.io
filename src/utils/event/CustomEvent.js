class CustomEvent {

    constructor() {
        this.eventListeners = {}
        this.markListeners = {}
    }


    static getInstance() {
        if (!this.instance) {
            this.instance = new CustomEvent()
        }
        return this.instance
    }

    /***
     *@description 事件绑定
     * @param {string} eventType
     * @param {function} listener
     * @param {string | number} markId
     * ***/
    on(eventType, listener, markId) {
        if (!this.eventListeners[eventType]) {
            this.eventListeners[eventType] = []
        }
        this.eventListeners[eventType].push({listener, markId})
        if (!markId) return
        if (!this.markListeners) this.markListeners = []
        this.markListeners[markId].push({eventType, listener})
    }

    /***
     *@description 事件解绑
     * @param {string} eventType
     * @param {function} listener
     * ***/
    off(eventType, listener) {
        let eventArr = this.eventListeners[eventType]

        if (!eventArr) return
        for (let eventIndex = eventArr.length - 1; eventIndex >= 0; eventIndex--) {
            let {markId: eventMarkId, listener: eventListener} = eventArr[eventIndex]
            if (!listener || eventListener === listener) {
                let markEventArr = this.markListeners[eventMarkId]
                let {listener: markListener} = markEventArr
                if (!markEventArr) return
                for (let markIndex = markEventArr.length - 1; markIndex >= 0; markIndex--) {
                    if (markListener === eventListener) {
                        markEventArr.splice(markIndex, 1)
                    }
                }
                if (!this.markListeners[eventMarkId].length) {
                    delete this.markListeners[eventMarkId]
                }
            }
        }
        if (!eventArr.length) {
            delete this.eventListeners[eventType]
        }
    }

    /**解绑指定事件下的所有监听器
     * @method offAll
     * @param  {string} eventType 要移除的事件名称
     */
    offAll(eventType) {
        let eventArr = this.eventListeners[eventType]
        if (!eventArr) return
        for (let eventIndex = eventArr.length - 1; eventIndex >= 0; eventIndex--) {
            let {markId: eventMarkId, listener: eventListener} = eventArr[eventIndex]
            if (eventMarkId) {
                let markEventArr = this.markListeners[eventMarkId]
                if (markEventArr) {
                    for (let markIndex = markEventArr.length - 1; markIndex >= 0; markIndex--) {
                        if (markEventArr[markIndex].listener === eventListener) {
                            markEventArr.splice(markIndex, 1)
                        }
                    }
                    if (markEventArr.length <= 0) {
                        delete this.markListeners[eventMarkId]
                    }
                }
            }
            eventArr.splice(eventIndex, 1)
        }
        if (eventArr.length <= 0) delete this.eventListeners[eventType]
    }

    /**
     * @description 根据markId解绑拥有这个标识id的所有事件
     * @param  {string|number} markId 要解绑的事件标识id
     */
    offAllByMarkId(markId) {
        let markEventArr = this.markListeners[markId]
        if (markEventArr) {
            for (let markIndex = 0; markIndex < markEventArr.length; markIndex++) {
                let {eventType: markEventType, listener: markListener} = markEventArr[markIndex]
                let eventArr = this.eventListeners[markEventType]
                if (eventArr) {
                    for (let eventIndex = eventArr.length - 1; eventIndex >= 0; eventIndex--) {
                        if (eventArr[eventIndex].listener === markListener) {
                            eventArr.splice(eventIndex, 1)
                        }
                    }

                    if (!this.eventListeners[markEventType].length)
                        delete this.eventListeners[markEventType]
                }
            }
            this.markListeners[markId].length = 0
            delete this.markListeners[markId]
        }
    }

    /**触发事件
     * @method trigger
     * @param  {string} eventType 要触发的事件名称
     * @param  {function} eventMessage 触发事件携带的回调参数。
     */
    trigger(eventType, eventMessage) {
        let eventArr = this.eventListeners[eventType]
        if (!eventArr) return
        for (let i = 0, len = eventArr.length; i < len; i++) {
            if (eventArr[i] && eventArr[i].listener) {
                eventArr[i].listener && eventArr[i].listener(eventMessage)
            }
        }
    }
}

export default CustomEvent.getInstance()
