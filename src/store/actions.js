export const initPngAction = ({commit}, cb) => {
    commit('initPngMutation', cb)
}

export const reverseCard = ({commit}, index) => {
    // console.log('action reverseCard', commit, card)
    return new Promise((resolve) => {
        commit('REVERSE_CARD', index)
        resolve(index)
    })
}

export const setReversing = ({commit}, payload) => {
    commit('SET_REVERSING', payload)
}
