import {isBrower} from "./util"

function initWeixin() {

}

export default (cb) => {
  /*微信打开*/
  if (isBrower("micromessenger")) {

  }
  /*非微信打开*/
  else {
    cb();
  }
}
