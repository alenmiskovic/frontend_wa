import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Message from '@/components/Message.vue'; // Dodavanje Message.vue komponente

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true } // Ruta zahtijeva autentifikaciju
    },
    {
      path: '/message',
      name: 'Message',
      component: Message,
      meta: { requiresAuth: true } // Ruta zahtijeva autentifikaciju
    }
  ]
});
