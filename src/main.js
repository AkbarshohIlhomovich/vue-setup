// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import { ToastPlugin } from './components/toast-plugin'
import './style.css';
import router from './router';
import api from './services/api'; 
import { i18nPlugin } from './components/translation/i18n';

const app = createApp(App);

app.config.globalProperties.$api = api;

app
.use(router)
.use(ToastPlugin)
.use(i18nPlugin)
.mount('#app');
