import { createRouter, createWebHashHistory } from "vue-router";

import routes from "@/router/router-list.js";
import { useAuthenticatedStore } from "@/stores/authenticated.js";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authenticated = useAuthenticatedStore();
  await authenticated.getAuthenticated();
  if (to.meta.requireAuth) {

    if (!authenticated.isLogin()) {
      return next("/authentication/login");
    }
  }
  return next();
});

export default router;
