import { uuidv4 } from "@app/utils/uuid";
import { YsGlobal } from "../handleGlobal";

type MediaStatus = "starting" | "play" | "pause" | "end";

interface IMedia {
    id: string;
    hash?: string;
    url: string;
    status?: MediaStatus;
    volume?: number;
    element?: HTMLDivElement;
    stream?: any;
}

export class Media {
    private _id: string = ""; // 播放的id
    get id(): string {
        return this._id;
    };
    private _hash: string = ""; // 文件id
    get hash(): string {
        return this._hash;
    };
    private _url: string = ""; // 媒体文件链接
    get url(): string {
        return this._url;
    };
    private _status: MediaStatus = "starting"; // "starting" | "play" | "pause" | "end", 正在打开 | 播放中 | 暂停中 | 结束
    get status(): MediaStatus {
        return this._status;
    };
    private _volume: number = 90; // 声音
    get volume(): number {
        return this._volume;
    };
    private _element: HTMLDivElement = document.createElement("div"); // 播放的元素
    get element(): HTMLDivElement {
        return this._element;
    };
    private _stream: any = null; // 媒体流
    get stream(): any {
        return this._stream;
    };
    // source: "" = ""; // 媒体来源

    constructor({id, url, status, volume, element, stream}: IMedia) {
        if (volume !== 0 && !volume) volume = 100;
        if (volume < 0) volume = 0;
        if (volume > 100) volume = 100;
        this._id = id;
        this._url = url;
        this._status = status || "starting";
        this._volume = volume;
        this._element = element = document.createElement("div");
        this._stream = stream = null;
        this._hash = uuidv4();
    }

    setStatus(status: MediaStatus) {
        this._status = status;
    }

    setVolume(volume: number) {
        if (volume < 0) volume = 0;
        if (volume > 100) volume = 100;
        this._volume = volume;
    }

    setElement(element: any) {
        this._element = element;
    }

    setStream(stream: any) {
        this._stream = stream;
    }

    remove() {
        YsGlobal.roomClient.removeInjectStreamUrl(this.url);
    }

    pause(isPause: boolean) {
        this.setStatus(isPause ? "pause" : "play");
        YsGlobal.roomClient.pauseInjectStreamUrl(this.url, isPause);
    }

    setPosition(positionPercent: number) {
        if (positionPercent < 0) positionPercent = 0;
        if (positionPercent > 100) positionPercent = 100;
        YsGlobal.roomClient.pauseInjectStreamUrl(this.url, positionPercent);
    }
}

class MediaManager {
    mediaList = new Map<string, Media>(); // 当前播放的媒体文件的列表
    
    updateMedia(media: IMedia): Media {
        let mediaInfo: Media = <Media>this.mediaList.get(media.hash || "") || {};
        if (mediaInfo.hash) {
            mediaInfo.setStatus(media.status || mediaInfo.status);
            mediaInfo.setVolume(media.volume || mediaInfo.volume);
            mediaInfo.setElement(media.element || mediaInfo.element);
            mediaInfo.setStream(media.stream || mediaInfo.stream);
        } else {
            mediaInfo = new Media(media);
        }
        this.mediaList.set(mediaInfo.hash, mediaInfo);
        return mediaInfo;
    }

    removeMedia(hash: string): void {
        this.mediaList.delete(hash);
    }

    getMedia(hash: string): Media {
        return this.mediaList.get(hash) || new Media({
            id: "",
            url: "",
            status: "end",
            volume: 0,
            element: document.createElement("div"),
            stream: null,
        });
    }

    getMediaById(id: string): Media[] {
        if (this.mediaList.size < 1) return [];
        return [...this.mediaList.values()].filter((media: Media) => media.id === id) || [];
    }

    clean(): void {
        [...this.mediaList.values()].forEach((media: Media) => media.remove());
    }

    pauseAll(isPause: boolean): void {
        [...this.mediaList.values()].forEach((media: Media) => media.pause(isPause));
    }
}

export const mediaManager = new MediaManager();