import Toast from "./Toast";

const obj = {};

obj.install = function(Vue) {
  // Vue.extend()
  // 1. 创建组件构造器
  const toastContrustor = Vue.extend(Toast);

  // 2. new的方式，根据组件构造器，可以创建一个组件对象
  const toast = new toastContrustor();

  // 3. 将组件对象，手动挂载到某个元素上
  toast.$mount(document.createElement("div"));

  // 4. toast.$el 对应的就是div
  document.body.appendChild(toast.$el);

  // 5. 给Vue的原型添加$toast属性
  Vue.prototype.$toast = toast;
};

export default obj;
