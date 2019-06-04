import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Auth from '@okta/okta-vue';

Vue.use(Auth, {
  issuer: 'https://dev-997113.okta.com/oauth2/default',
  client_id: '0oaoef16vsb1P0VOX356',
  redirect_uri: window.location.origin + '/implicit/callback',
});

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/search",
      name: "search",
      meta: {
        requiresAuth: true,
      },
      component: () =>
        import(/* webpackChunkName: "search" */ "./views/Search.vue")
    },
    {
      path: "/details",
      name: "details",
      meta: {
        requiresAuth: true,
      },
      component: () =>
          import(/* webpackChunkName: "details" */ "./views/Details.vue")
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    }
  ]
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
