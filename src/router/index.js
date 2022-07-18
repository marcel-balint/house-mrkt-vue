import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import HouseAddView from "../views/HouseAddView.vue";
import HouseDetailView from "../views/HouseDetailView.vue";
import HouseEditView from "../views/HouseEditView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/house/add",
    name: "add",
    component: HouseAddView,
  },
  {
    path: "/house/view/:houseId",
    name: "view",
    component: HouseDetailView,
  },
  {
    path: "/house/edit/:houseId",
    name: "edit",
    component: HouseEditView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
