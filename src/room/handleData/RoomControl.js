import globalInfo from "../globalInfo"
import {clientEventKey} from '../../utils/event/YSRTCEventKey'
import CustomEvent from "../../utils/event/CustomEvent"

const {RoomClient} = globalInfo

class RoomControl {
    constructor() {
        this.roomAddress = {
            serverName: "",
            docaddr: '',
            signaladdr: '',
            signalport: 0,
            webaddr: "",
            webProtocol: 'https',
            webPort: 443
        }
    }

    setRoomAddress(data) {
        this.roomAddress = Object.assign(this.roomAddress, data)
    }

    getRoomAddress() {
        return this.roomAddress
    }

    eventForwarding() {
        clientEventKey.forEach(eventKey => {
            RoomClient.on(eventKey, data => {
                CustomEvent.trigger(eventKey, data)
            })
        })
    }
}

export default new RoomControl()
