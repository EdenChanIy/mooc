// 数据说明
// leavePosition: {
//   cid: 课程id,
//   chapter: 第几章节,
//   sid: 第几课时,
//   time: 时间点
// }
const state = {
  // 用户最近的学习结点
  leavePosition: null
}

const getters = {
  getLeavePosition: (state, getters, rootState) => {
    return state.leavePosition
  }
}

const mutations = {
  setLeavePosition (state, leavePosition) {
    state.leavePosition = leavePosition
  }
}

const actions = {
  setLeavePosition: ({ state, commit }, leavePosition) => {
    commit('setLeavePosition', leavePosition)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
