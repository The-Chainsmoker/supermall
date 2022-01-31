import { request } from "./request";

//模块化管理网络接口
export function getHomeMuitidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}