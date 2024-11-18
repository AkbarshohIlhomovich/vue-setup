<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'info'
  },
  messages: {
    type: Array,
    required: true
  },
  duration: {
    type: Number,
    default: 5000
  }
});

const emit = defineEmits(['remove']);

onMounted(() => {
  if (props.duration > 0) {
    setTimeout(() => {
      emit('remove', props.id);
    }, props.duration);
  }
});
</script>

<template>
  <div 
    :class="[
      'flex items-center min-h-[40px] py-2 px-3 mb-2 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out',
      {
        'bg-green-100 border-l-4 border-green-500': type === 'success',
        'bg-red-100 border-l-4 border-red-500': type === 'error',
        'bg-yellow-100 border-l-4 border-yellow-500': type === 'warning',
        'bg-blue-100 border-l-4 border-blue-500': type === 'info'
      }
    ]"
  >
    <!-- Icon -->
    <div class="shrink-0 mr-2">
      <svg v-if="type === 'success'" class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <svg v-if="type === 'error'" class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <svg v-if="type === 'warning'" class="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <svg v-if="type === 'info'" class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>

    <!-- Messages -->
    <div class="flex-grow min-w-0">
      <div 
        :class="[
          'text-sm font-medium truncate',
          {
            'text-green-900': type === 'success',
            'text-red-900': type === 'error',
            'text-yellow-900': type === 'warning',
            'text-blue-900': type === 'info'
          }
        ]"
      >
        {{ messages[0] }}
      </div>
      <div v-if="messages.length > 1" class="text-xs text-gray-600 mt-0.5">
        +{{ messages.length - 1 }} more similar {{ messages.length === 2 ? 'message' : 'messages' }}
      </div>
    </div>

    <!-- Counter & Close -->
    <div class="flex items-center ml-2 shrink-0">
      <span v-if="messages.length > 1" 
        class="mr-2 px-1.5 py-0.5 bg-gray-200 rounded-full text-xs font-medium text-gray-800">
        {{ messages.length }}
      </span>
      <button 
        @click="$emit('remove', id)"
        class="text-gray-400 hover:text-gray-900 transition-colors duration-200"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>
