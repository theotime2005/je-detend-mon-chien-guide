import { defineStore } from "pinia";

import checkUser from "@/adapters/authenticated/check-user.js";

export const useAuthenticatedStore = defineStore("authenticated", {
  state: () => ({
    firstname: null,
    lastname: null,
    isLogin: false,
  }),

  actions: {
    async getAuthenticated() {
      const auth = await checkUser();
      if (auth) {
        this.firstname = auth.firstname;
        this.lastname = auth.lastname;
        this.isLogin = true;
        return true;
      } else {
        this.firstname = null;
        this.lastname = null;
        this.isLogin = false;
        return false;
      }
    },
  },
});
