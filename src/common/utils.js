// 防抖(debounce)/节流(throttle)操作
export function debounce(func, delay) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/* 时间转换函数 */
// 转换时间戳
export function formatDate(date, fmt) {
  // 1. 获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  // 2. 获取
  /*
   * y+ / M+ / d+ / h+ / m+ / s+
   * 原因： y可能存在多种值
   * (yy/yyyy => 21/2021)
   *
   * 注:
   * y+  ->  1个或者多个y
   * y*  ->  0个或者多个y
   * y?  ->  0个或者 1个y
   * */
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}
// 对不足两位数 转换成两位数 ( 4 => 04 )
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}
