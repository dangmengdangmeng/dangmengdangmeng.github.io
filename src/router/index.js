import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "page",
      component: () => import("@/pages/page")
    },
    {
      path: "/index",
      name: "index",
      component: () => import("@/pages/index")
    },
    {
      path: "/details",
      name: "details",
      component: () => import("@/pages/details")
    },
    {
      path: "/charts",
      name: "charts",
      component: () => import("@/pages/charts")
    },
    {
      path: "/user_charts",
      name: "user_charts",
      component: () => import("@/pages/user_charts.vue"),
      children: [
        {
          path: '',
          name: 'memberGrowth',
          component: () => import("@/components/memberGrowth.vue")
        },
        {
          path: 'memberStats',
          name: 'memberStats',
          component: () => import("@/components/memberStats.vue")
        }
      ]
    },
    {
      path: "/goods_scan_charts",
      name: "goods_scan_charts",
      component: () => import("@/pages/goods_scan_charts")
    },
    {
      path: "/history_data",
      name: "history_data",
      component: () => import("@/pages/history_data")
    },
    {
      path: "/store_count",
      name: "store_count",
      component: () => import("@/pages/store_count")
    },
    {
      path: "/store_sales",
      name: "store_sales",
      component: () => import("@/pages/store_sales")
    },
    {
      path: "/dealer_count",
      name: "dealer_count",
      component: () => import("@/pages/dealer_count")
    },
    {
      path: "/dealer_sales",
      name: "dealer_sales",
      component: () => import("@/pages/dealer_sales")
    }
  ]
});
