<!-- src/components/FlexibleBaseForm.vue -->
<template>
    <div :class="{'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50': isModal}">
      <div :class="[
        containerClass,
        isModal ? 'max-h-svh w-full overflow-auto bg-white p-6 rounded-lg custom-scrollbar' : '',
        isModal ? modalWidth : ''
      ]">
        <!-- Modal Header -->
        <div v-if="isModal" class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-900">{{ modalTitle }}</h2>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
  
        <form @submit.prevent="handleSubmit" :class="formClass" novalidate>
          <div
            v-for="(field, index) in formFields"
            :key="index"
            :class="['form-group', fieldClass]"
          >
            <!-- Label -->
            <label 
              :for="field.name"
              :class="['block font-medium mb-1', labelClass]"
            >
              {{ field.label }}
              <span v-if="field.required" class="text-red-500">*</span>
            </label>
  
            <!-- Input Fields -->
            <div :class="inputWrapperClass">
              <!-- Text/Email/Password/Number Input -->
              <input
                v-if="['text', 'email', 'password', 'number', 'tel', 'date'].includes(field.type)"
                :id="field.name"
                :type="field.type"
                :name="field.name"
                :placeholder="field.placeholder"
                :value="modelValue[field.name]"
                :required="field.required"
                :min="field.min"
                :max="field.max"
                :pattern="field.pattern"
                @input="updateField(field.name, $event.target.value)"
                @blur="validateField(field.name)"
                :class="[
                  'px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors',
                  inputClass,
                  errors[field.name] ? 'border-red-300' : 'border-gray-300'
                ]"
              >
  
              <!-- Textarea -->
              <textarea
                v-else-if="field.type === 'textarea'"
                :id="field.name"
                :name="field.name"
                :placeholder="field.placeholder"
                :value="modelValue[field.name]"
                :required="field.required"
                :rows="field.rows || 4"
                @input="updateField(field.name, $event.target.value)"
                @blur="validateField(field.name)"
                :class="[
                  'px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors',
                  inputClass,
                  errors[field.name] ? 'border-red-300' : 'border-gray-300'
                ]"
              ></textarea>
  
              <!-- Select -->
              <select
                v-else-if="field.type === 'select'"
                :id="field.name"
                :name="field.name"
                :value="modelValue[field.name]"
                :required="field.required"
                @change="updateField(field.name, $event.target.value)"
                @blur="validateField(field.name)"
                :class="[
                  'px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors',
                  inputClass,
                  errors[field.name] ? 'border-red-300' : 'border-gray-300'
                ]"
              >
                <option value="">{{ field.placeholder || 'Select an option' }}</option>
                <option
                  v-for="option in field.options"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
  
              <!-- Radio Group -->
              <div 
                v-else-if="field.type === 'radio'" 
                :class="['space-y-2', radioClass]"
              >
                <div
                  v-for="option in field.options"
                  :key="option.value"
                  class="flex items-center"
                >
                  <input
                    :id="`${field.name}-${option.value}`"
                    type="radio"
                    :name="field.name"
                    :value="option.value"
                    :checked="modelValue[field.name] === option.value"
                    @change="updateField(field.name, option.value)"
                    class="h-4 w-4 text-purple-600 focus:ring-purple-500"
                  >
                  <label
                    :for="`${field.name}-${option.value}`"
                    class="ml-2 text-sm text-gray-700"
                  >
                    {{ option.label }}
                  </label>
                </div>
              </div>
  
              <!-- Checkbox Group -->
              <div 
                v-else-if="field.type === 'checkbox'" 
                :class="['space-y-2', checkboxClass]"
              >
                <div
                  v-for="option in field.options"
                  :key="option.value"
                  class="flex items-center"
                >
                  <input
                    :id="`${field.name}-${option.value}`"
                    type="checkbox"
                    :name="field.name"
                    :value="option.value"
                    :checked="isChecked(field.name, option.value)"
                    @change="updateCheckbox(field.name, option.value)"
                    class="h-4 w-4 text-purple-600 focus:ring-purple-500 rounded"
                  >
                  <label
                    :for="`${field.name}-${option.value}`"
                    class="ml-2 text-sm text-gray-700"
                  >
                    {{ option.label }}
                  </label>
                </div>
              </div>
  
              <!-- File Input -->
              <div 
                v-else-if="field.type === 'file'" 
                :class="['space-y-2', fileClass]"
              >
                <div class="flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg" 
                     :class="{'border-red-300': errors[field.name], 'border-gray-300': !errors[field.name]}">
                  <div class="space-y-1 text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div class="flex text-sm text-gray-600">
                      <label :for="field.name" class="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                        <span>Upload a file</span>
                        <input 
                          :id="field.name"
                          :name="field.name"
                          type="file"
                          :accept="field.accept"
                          class="sr-only"
                          @change="handleFileUpload($event, field.name)"
                        >
                      </label>
                      <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs text-gray-500">
                      {{ field.fileTypes || 'Any file up to 10MB' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Error Message -->
            <p v-if="errors[field.name]" class="mt-1 text-sm text-red-600">
              {{ errors[field.name] }}
            </p>
  
            <!-- Help Text -->
            <p v-if="field.helpText" class="mt-1 text-sm text-gray-500">
              {{ field.helpText }}
            </p>
          </div>
  
          <!-- Form Buttons -->
          <div :class="['flex items-center', buttonsClass]">
            <button
              v-if="showCancel"
              type="button"
              @click="$emit('cancel')"
              :class="[
                'px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500',
                cancelButtonClass
              ]"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              :class="[
                'px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50',
                submitButtonClass
              ]"
            >
              <span v-if="isSubmitting">
                <svg class="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
              </span>
              <span v-else>{{ submitText }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FlexibleBaseForm',
    props: {
      formFields: {
        type: Array,
        required: true
      },
      modelValue: {
        type: Object,
        required: true
      },
      showCancel: {
        type: Boolean,
        default: false
      },
      submitText: {
        type: String,
        default: 'Submit'
      },
      isModal: {
        type: Boolean,
        default: false
      },
      modalTitle: {
        type: String,
        default: 'Form'
      },
      // Styling props
      containerClass: {
        type: String,
        default: ''
      },
      modalWidth: {
        type: String,
        default: 'w-full max-w-2xl'
      },
      formClass: {
        type: String,
        default: 'space-y-6'
      },
      fieldClass: {
        type: String,
        default: ''
      },
      labelClass: {
        type: String,
        default: 'text-sm text-gray-700'
      },
      inputWrapperClass: {
        type: String,
        default: ''
      },
      inputClass: {
        type: String,
        default: 'w-full'
      },
      radioClass: {
        type: String,
        default: ''
      },
      checkboxClass: {
        type: String,
        default: ''
      },
      fileClass: {
        type: String,
        default: ''
      },
      buttonsClass: {
        type: String,
        default: 'justify-end space-x-4'
      },
      submitButtonClass: {
        type: String,
        default: ''
      },
      cancelButtonClass: {
        type: String,
        default: ''
      }
    },
    emits: ['update:modelValue', 'submit', 'cancel', 'close'],
    data() {
      return {
        errors: {},
        isSubmitting: false
      }
    },
    methods: {
      updateField(fieldName, value) {
        const newValue = { ...this.modelValue, [fieldName]: value }
        this.$emit('update:modelValue', newValue)
        this.validateField(fieldName)
      },
      updateCheckbox(fieldName, value) {
        const currentValues = Array.isArray(this.modelValue[fieldName]) 
          ? this.modelValue[fieldName] 
          : []
        
        const newValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value]
        
        this.updateField(fieldName, newValues)
      },
      isChecked(fieldName, value) {
        return Array.isArray(this.modelValue[fieldName]) && 
               this.modelValue[fieldName].includes(value)
      },
      handleFileUpload(event, fieldName) {
        const file = event.target.files[0]
        if (file) {
          this.updateField(fieldName, file)
        }
      },
      validateField(fieldName) {
        const field = this.formFields.find(f => f.name === fieldName)
        if (!field) return
  
        const value = this.modelValue[fieldName]
        let error = null
  
        if (field.required && !value) {
          error = `${field.label} is required`
        }
  
        if (field.type === 'email' && value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(value)) {
            error = 'Please enter a valid email address'
          }
        }
  
        if (field.type === 'number' && value) {
          if (field.min !== undefined && value < field.min) {
            error = `Value must be at least ${field.min}`
          }
          if (field.max !== undefined && value > field.max) {
            error = `Value must be no more than ${field.max}`
          }
        }
  
        if (field.pattern && value) {
        const regex = new RegExp(field.pattern)
        if (!regex.test(value)) {
          error = field.patternError || 'Invalid format'
        }
      }

      if (field.validate && value) {
        const customError = field.validate(value)
        if (customError) {
          error = customError
        }
      }

      if (error) {
        this.errors = { ...this.errors, [fieldName]: error }
      } else {
        const newErrors = { ...this.errors }
        delete newErrors[fieldName]
        this.errors = newErrors
      }
    },
    validateForm() {
      this.formFields.forEach(field => {
        this.validateField(field.name)
      })
      return Object.keys(this.errors).length === 0
    },
    async handleSubmit() {
      if (this.validateForm()) {
        this.isSubmitting = true
        try {
          await this.$emit('submit', this.modelValue)
        } finally {
          this.isSubmitting = false
        }
      }
    }
  }
}
</script>


<style>
  /* Custom scrollbar styles */
::-webkit-scrollbar {
    display: none;
    padding: 0;
    width: 17px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
</style>