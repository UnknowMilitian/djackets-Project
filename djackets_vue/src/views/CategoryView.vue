<template>
  <div class="page-category">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">{{ category.name }}</h2>
      </div>

      <ProductBox
        v-for="product in category.products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import ProductBox from "../components/ProductBox.vue";
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "Category",
  components: {
    ProductBox,
  },
  data() {
    return {
      category: {
        products: [],
      },
    };
  },

  mounted() {
    this.getCategory();
  },

  watch: {
    $route: {
      handler(to, from) {
        if (to.name === "category") {
          this.getCategory();
        }
      },
      immediate: true,
      deep: false,
    },
  },

  methods: {
    async getCategory() {
      const categorySlug = this.$route.params.category_slug;

      this.$store.commit("setIsLoading", true);

      try {
        const response = await axios.get(`/api/v1/products/${categorySlug}`);
        this.category = response.data;
        document.title = this.category.name + " | Djackets";
      } catch (err) {
        console.error(err);
        toast({
          message: "Something went wrong. Please try again.",
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
          duration: 2000,
          position: "bottom-right",
        });
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
  },
};
</script>
