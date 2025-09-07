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
    name: "Connexion",
    path: "/authentication/login",
    component: () => import("@/views/authentication/LoginView.vue"),
    meta: {
      display: "unlogged",
      navbar: true,
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
    path: "/authentication/activate",
    name: "Activation du compte",
    component: () => import("@/views/authentication/ActivationView.vue"),
    meta: {
      navbar: false,
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
