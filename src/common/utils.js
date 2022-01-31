export function debounce(func, delay) {
  let time = null
  return function (...args) {
    //如果调用频繁就会清掉之前的定时器
    //...args如(1,5,6,7)或([1,2,3,4])
    if (time) clearTimeout(time)

    time = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * 格式化函数 ， 给日期格式化
 * date为 new Date()对象， fmt为 'yyyy-MM-dd'的格式
 */
export function formatDate(date, fmt) {
  //获取年份
  /* 
  y+ -> 1个或者多个y
  y* -> 0个或者多个y
  y? -> 0个或者1个y 
  */
  if (/(y+)/.test(fmt)) {
    let dateY = date.getFullYear() + "";//转成字符串类型
    //RegExp.$1 在判断中出现过，且是括号括起来的，所以 RegExp.$1 就是 "yyyy"
    fmt = fmt.replace(RegExp.$1, dateY.substr(4 - RegExp.$1.length));//String.substr返回时剩余的部分
  }

  //获取其他
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        //是根据传入M去判断显示一位还是两位,而不是根据出入数值(如8)去判断
        //RegExp.$1.length匹配用户传经来的如yyyy-MM-dd里的yyyy或MM或dd
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

function padLeftZero(str) {
  //04->0004截取两位->04
  //4->004截取一位->04
  return ("00" + str).substr(str.length);
}