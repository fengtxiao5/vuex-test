export default {
    initPngMutation(state, cb) {
        console.log('initPngMutation state', state)
        console.log('initPngMutation cb', cb)
        state.allCards = cb
    },
    SET_REVERSING(state, payload) {
        state.reversing = payload
    },
    SET_NEEDREVERSE(state, payload) {
      state.needReverse = payload
    },
    REVERSE_CARD(state, index) {
        console.log('state', state, index)
        let card = state.allCards[index]
        if (card.status === '1') {
            state.allCards[index].status = '0'
            state.currentCard = null
            state.needReverse = null
        } else {
            if (state.currentCard != null && state.allCards[state.currentCard].name === card.name && state.currentCard !== index) {
                //如果有翻开的，相同则消除
                console.log('如果有翻开的，相同则消除')
                card.status = '2'
                state.allCards[state.currentCard].status = '2'
                state.currentCard = null
                state.needReverse = null
                //消除完判断是否全部翻开
                if (state.allCards.filter((x) => x.status !== '2').length === 0) {
                    alert('消除完毕~')
                }
            } else if (state.currentCard != null && state.allCards[state.currentCard].name !== card.name) {
                //如果有翻开的，不相同则重置到背面
                console.log('/如果有翻开的，不相同则重置到背面')
                state.allCards[state.currentCard].status = '0'
                const tmpArr = [index,JSON.parse(JSON.stringify(state.currentCard))]
                state.currentCard = null
                state.needReverse = tmpArr
            } else {
                //如果没有翻开的，翻开
                console.log('如果没有翻开的，翻开')
                state.allCards[index].status = '1'
                state.currentCard = index
                state.needReverse = null
            }
        }


    }
}


