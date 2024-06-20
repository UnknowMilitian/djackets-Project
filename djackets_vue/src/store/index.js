import { createStore } from "vuex";

export default createStore({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    token: "",
    isLoading: false,
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem("cart")) {
        state.cart = JSON.parse(localStorage.getItem("cart"));
      } else {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    addToCart(state, item) {
      const existingItem = state.cart.items.find(
        (i) => i.product.id === item.product.id
      );
      if (existingItem) {
        existingItem.quantity += parseInt(item.quantity);
      } else {
        state.cart.items.push(item);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    setIsLoading(state, status) {
      state.isLoading = status;
    },
  },
  actions: {},
  modules: {},
  // Call initializeStore mutation when Vuex store is created
  plugins: [
    (store) => {
      store.commit("initializeStore");
    },
  ],
});
