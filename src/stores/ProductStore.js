import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    products: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    productCount: (state) => state.products.length,
    hasProducts: (state) => state.products.length > 0,

    categories: (state) => {
      const uniqueCategories = new Set();
      state.products.forEach((product) =>
        uniqueCategories.add(product.category)
      );
      return Array.from(uniqueCategories);
    },

    statuses: (state) => {
      const uniqueStatuses = new Set();
      state.products.forEach((product) => uniqueStatuses.add(product.status));
      return Array.from(uniqueStatuses);
    },

    getProductsByCategory: (state) => {
      return (category) =>
        state.products.filter((product) => product.category === category);
    },

    getProductsByStatus: (state) => {
      return (status) =>
        state.products.filter((product) => product.status === status);
    },
  },

  actions: {
    async getProducts() {
      if (this.isLoading) return;

      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(
          "https://966a61a1-fc75-4d06-8b55-f8eba92a5079.mock.pstmn.io"
        );
        this.products = response.data;
        return response.data;
      } catch (error) {
        this.error = error.message || "Failed to fetch products";
        console.error("Error fetching products:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

  
    clearError() {
      this.error = null;
    },

    addProduct(product) {
      this.products.push(product);
    },

    updateProduct(id, updatedProduct) {
      const index = this.products.findIndex((product) => product.id === id);
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...updatedProduct };
      }
    },

    removeProduct(id) {
      this.products = this.products.filter((product) => product.id !== id);
    },
  },
});
