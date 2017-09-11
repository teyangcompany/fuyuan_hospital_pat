import storage from "good-storage";

const FILE_ID_CACHE = "__file_id__"

export class fileClass {
    constructor(file, url) {
        this._setId();
        this.thumbUrl = "";
        this.imgId = "";
        this.progress = "0%";
        this.status = "beforeload";
        if (file) {
            this.file = file;
        }
        if (url) {
            this.url = url;
            this.status = "loaded";
        }
    }

    _setId() {
        let id = storage.session.get(FILE_ID_CACHE, 0);
        id = parseInt(id);
        id++;
        storage.session.set(FILE_ID_CACHE, id);
        this.id = "FILE_ID_" + id;
        this.sort = id;
    }

    changeStatus(status) {
        this.status = status;
    }

    setUrl(url) {
        this.url = url;
    }


    /**
     *利用FileReader获取缩略图
     * @returns {Promise}
     */
    thumb() {
        if (this.file) {
            return new Promise((resolve, reject) => {
                let fr = new FileReader();
                fr.onload = () => {
                    resolve(fr.result);
                }
                fr.onerror = err => reject(err);
                fr.readAsDataURL(this.file);
            })
        }
    }

    setThumbUrl(thumbUrl) {
        this.thumbUrl = thumbUrl;
    }

    setProgress(progress) {
        this.progress = Math.round(parseFloat(progress.loaded / progress.total) * 10000) / 100 + "%";
    }

    setImgId(id) {
        this.imgId = id;
    }


}