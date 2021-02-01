import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Home = () => import("views/home/Home");
const Category = () => import("views/category/Category");
const Cart = () => import("views/cart/Cart");
const Profile = () => import("views/profile/Profile");
const Detail = () => import("views/detail/Detail");
const Login = () => import("views/login/Login");

// 创建路由对象
const routes = [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/category",
    component: Category
  },
  {
    path: "/cart",
    component: Cart
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/detail/:iid",
    component: Detail
  },
  {
    path: "/login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
