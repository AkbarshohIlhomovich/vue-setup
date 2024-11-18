// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../views/HelloWorld.vue';
import TestComponent from '../views/TestComponent.vue';
import NotFound from '../components/NotFound.vue';
import Search from '../views/Search.vue';
import Pricing from '../views/Pricing.vue';
import TranslationManager from "../components/translation/TranslationManager.vue"

// Define routes with meta field for protected routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorld,
  },
  {
    path: '/about',
    name: 'About',
    component: TestComponent,
    meta: { requiresAuth: true },
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: Pricing,
    // meta: { requiresAuth: true },
  },
  {
    path: '/language',
    name: 'Translations',
    component: TranslationManager,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

// Authentication check function
function isAuthenticated() {
  return !!localStorage.getItem('authToken');
}

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Set up navigation guard to protect routes
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'Home' });
  } else {
    next(); 
  }
});

export default router;
