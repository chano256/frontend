import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth";
import Login from "@/pages/login.vue";

const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { requiresAuth: false }, // No auth needed for login
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.token) {
    next({ name: "login" }); // Redirect to login if not authenticated
  } else {
    next();
  }
});

export default router;
