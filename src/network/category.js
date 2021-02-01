import { request } from "./request";

// 请求侧边分类数据
export function getCategory() {
  return request({
    url: "/category"
  });
}

// 请求对应分类数据请求内容
export function getSubcategory(maitKey) {
  return request({
    url: "/subcategory",
    params: {
      maitKey
    }
  });
}

// 下面商品数据
// 请求对应分类数据请求内容
// export function getCategoryGoods(miniWallkey, type) {
//   return request({
//     url: "/subcategory/detail",
//     params: {
//       miniWallkey,
//       type
//     }
//   });
// }
