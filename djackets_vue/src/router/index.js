import { createRouter, createWebHistory } from "vue-router";

import store from "../store";

import HomeView from "../views/HomeView.vue";
import Product from "../views/ProductView.vue";
import Category from "../views/CategoryView.vue";
import Search from "../views/SearchView.vue";
import Cart from "../views/CartView.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/LoginView.vue";
import MyAccount from "../views/MyAccount.vue";
import Checkout from "../views/Checkout.vue";
import Success from "../views/Success.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: Search,
  },
  {
    path: "/:category_slug/:product_slug",
    name: "product",
    component: Product,
  },
  {
    path: "/:category_slug/",
    name: "category",
    component: Category,
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: SignUp,
  },
  {
    path: "/log-in",
    name: "log-in",
    component: Login,
  },
  {
    path: "/my-account",
    name: "my-account",
    component: MyAccount,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/cart/checkout",
    name: "checkout",
    component: Checkout,
    meta: {
      requireLogin: true,
    },
  },

  {
    path: "/cart/success",
    name: "success",
    component: Success,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requireLogin) &&
    !store.state.isAuthenticated
  ) {
    next({ name: "Login", query: { to: to.path } });
  } else {
    next();
  }
});

export default router;
