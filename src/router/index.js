import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth";
import Login from "@/views/LoginView.vue";
import Dashboard from "@/views/DashboardView.vue";

const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { requiresAuth: false }, // No auth needed for login
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }, // Protect this route
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
