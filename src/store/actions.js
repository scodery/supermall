// 导入常量
import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";

export default {
  addCart(content, payload) {
    return new Promise((resolve, reject) => {
      // 1. 查找数组中是否存在该商品
      let oldProduct = content.state.cartList.find(
        item => item.iid === payload.iid
      );

      // 2. 判断oldProduct是否存在
      if (oldProduct) {
        content.commit(ADD_COUNTER, oldProduct);
        resolve("当前商品的数量已增加");
      } else {
        payload.count = 1;
        content.commit(ADD_TO_CART, payload);
        resolve("已经成功添加了新商品");
      }
    });
  }
};
