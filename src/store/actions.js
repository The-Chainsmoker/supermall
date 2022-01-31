import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export const actions = {
  //里面对直接对state成员操作是不能跟踪的,浏览器Vue插件不能显示(mutations才可以,通过commit发送到)
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //查找之前数组是否有该商品保存到oldProduct 
      let oldProduct = context.state.cartList.find(item => {
        return item.iid === payload.iid
      })

      if (oldProduct) {
        //oldProduct.count++
        context.commit(ADD_COUNTER, oldProduct)//把函数在这里引用执行里面count++
        resolve('数量+1')
      } else {
        payload.count = 1
        payload.check = true
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('商品加入成功')
      }
    })
  }
}