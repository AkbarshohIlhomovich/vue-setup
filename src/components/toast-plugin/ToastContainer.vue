<script setup>
import { ref, watch } from 'vue';
import ToastItem from './ToastItem.vue';

const toasts = ref({});  // Changed to object to group by type
let toastCounter = 0;

const addToast = (type, message, duration = 5000) => {
  if (!toasts.value[type]) {
    toasts.value[type] = {
      id: `toast-${toastCounter++}`,
      type,
      messages: [],
      duration
    };
  }
  
  toasts.value[type].messages.push(message);
  
  // Reset the timer when a new message is added
  if (duration > 0) {
    clearTimeout(toasts.value[type].timer);
    toasts.value[type].timer = setTimeout(() => {
      removeToast(toasts.value[type]?.id);
    }, duration);
  }
};

const removeToast = (id) => {
  Object.keys(toasts.value).forEach(type => {
    if (toasts.value[type].id === id) {
      delete toasts.value[type];
    }
  });
};

defineExpose({
  addToast,
  removeToast
});
</script>

<template>
  <div class="fixed top-4 right-4 z-50 w-80">
    <TransitionGroup 
      name="toast"
      tag="div"
      class="space-y-1"
    >
      <ToastItem
        v-for="toast in Object.values(toasts)"
        :key="toast.id"
        :id="toast.id"
        :type="toast.type"
        :messages="toast.messages"
        :duration="toast.duration"
        @remove="removeToast"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
