import storage from "good-storage";
import config from "./config"


/**
 * 文件对象类
 */
const FILE_ID_CACHE = config.prefix + (window.version || "") + "file_id_"

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

/**
 * 基于数据的表单验证类
 */
//基础验证方法
const validateFun = {
  need(value) {
    if (value) {
      return true
    } else {
      return false
    }
  },
  regex(value, regex) {
    return regex.test(value);
  },
  isPhone(value) {
    return /^1[0-9]{10}$/.test(value)
  },
  isNumber(value) {
    return /^[0-9]+$/.test(value);
  },
  minLength(value, length) {
    return value.length >= parseInt(length);
  },
  maxLength(value, length) {
    return value.length <= parseInt(length);
  }
}

export class validate {
  constructor(...args) {
    this.funs = [];
    this.validateFun = validateFun;
    if (args) {
      args.forEach((funObj) => {
        this.validateFun = Object.assign({}, this.validateFun, funObj);
      });
    }
  }

  add(value, ruleArr) {
    ruleArr.forEach((rule) => {
      this.funs.push({
        fun: this.validateFun[rule.shift()],
        msg: rule.shift(),
        params: [value].concat(rule)
      });
    })
    return this;
  }

  start() {
    for (let i = 0, rule; rule = this.funs[i++];) {
      if (rule.fun.apply(null, rule.params) === false) {
        return rule.msg;
      }
    }
  }
}
