const routes = [
  {
    path: "/",
    name: "Accueil",
    component: () => import("@/views/HomeView.vue"),
    meta: {
      navbar: true,
      display: "always",
    },
  },
  {
    path: "/authentication/register",
    name: "Inscription",
    component: () => import("@/views/authentication/RegisterView.vue"),
    meta: {
      navbar: true,
      display: "unlogged",
    },
  },
  {
    path: "/about",
    name: "A propos",
    component: () => import("@/views/AboutView.vue"),
    meta: {
      navbar: true,
      display: "always",
    },
  },
];

export default routes;
