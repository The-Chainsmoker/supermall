import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export const mutations = {
  [ADD_COUNTER](state, payload) {//能监视值的变化
    payload.count++
  },
  [ADD_TO_CART](state, paload) {//能监视值的变化
    state.cartList.push(paload)
  }
}