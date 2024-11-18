import { createApp, h, ref } from 'vue';
import ToastContainer from './ToastContainer.vue';

export const ToastPlugin = {
  install(app, options = {}) {
    const toastDiv = document.createElement('div');
    document.body.appendChild(toastDiv);

    const toastRef = ref(null);

    const toastApp = createApp({
      setup() {
        return {
          toastRef
        };
      },
      render() {
        return h(ToastContainer, {
          ref: toastRef
        });
      }
    });

    const instance = toastApp.mount(toastDiv);

    const toast = {
      success(message, duration = 5000) {
        toastRef.value?.addToast('success', message, duration);
      },
      error(message, duration = 5000) {
        toastRef.value?.addToast('error', message, duration);
      },
      warning(message, duration = 5000) {
        toastRef.value?.addToast('warning', message, duration);
      },
      info(message, duration = 5000) {
        toastRef.value?.addToast('info', message, duration);
      }
    };

    // Add toast methods to app's global properties
    app.config.globalProperties.$toast = toast;
    
    // Initialize $project if it doesn't exist
    if (!app.config.globalProperties.$project) {
      app.config.globalProperties.$project = {};
    }
    
    // Add toast methods to $project
    app.config.globalProperties.$project = {
      ...app.config.globalProperties.$project,
      successToast: toast.success,
      errorToast: toast.error,
      warningToast: toast.warning,
      infoToast: toast.info
    };

    // Provide toast methods to be used with composition API
    app.provide('toast', toast);
  }
};