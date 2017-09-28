import * as types from "./types"

export default {
  [types.USER_REG_FORM](state, payload) {
    state[types.USER_REG_FORM] = payload
  }
}
