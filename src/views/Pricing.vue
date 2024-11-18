<template>
  <div class="max-w-2xl mx-auto p-6">
    <!-- Any element can trigger the modal -->
    <div 
      @click="showForm = !showForm" 
      class="cursor-pointer text-blue-500 mb-4"
    >
      Click here to add a new user
    </div>
    <div 
      @click="showForm = !showForm" 
      class="cursor-pointer bg-gray-200 p-4 rounded-md"
    >
      Or click this box to open the form
    </div>

    <!-- Modal Form -->
    <div v-if="showForm" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg w-full max-w-lg">
        <ReusableForm
          v-model="formData"
          :form-fields="fields"
          submit-text="Create Account"
          show-cancel
          @submit="handleSubmit"
          @cancel="handleCancel"
          :is-modal="true"
        />


        <!-- <ReusableForm
        modal-title="Add New User"
        modal-width="w-full max-w-xl h-xl"
        input-class="w-full"
        :show-cancel="true"
        v-model="formData"
        :form-fields="fields"
        submit-text="Create Account"
        show-cancel
        @submit="handleSubmit"
        @cancel="handleCancel"
        @close="showModal = false"
      /> -->

        <button 
          @click="showForm = false" 
          class="mt-4 text-red-500"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ReusableForm from '../components/ReusableForm.vue';

export default {
  components: {
    ReusableForm
  },
  data() {
    return {
      showForm: false, // Controls modal visibility
      formData: {
        name: '',
        email: '',
        password: '',
        bio: '',
        role: '',
        interests: [],
        avatar: null,
        newsletter: false
      },
      fields: [
        {
          type: 'text',
          name: 'name',
          label: 'Full Name',
          required: true,
          placeholder: 'John Doe'
        },
        {
          type: 'email',
          name: 'email',
          label: 'Email Address',
          required: true,
          placeholder: 'john@example.com'
        },
        {
          type: 'password',
          name: 'password',
          label: 'Password',
          required: true,
          helpText: 'Must be at least 8 characters'
        },
        {
          type: 'textarea',
          name: 'bio',
          label: 'Bio',
          placeholder: 'Tell us about yourself...'
        },
        {
          type: 'select',
          name: 'role',
          label: 'Role',
          required: true,
          options: [
            { value: 'user', label: 'User' },
            { value: 'admin', label: 'Admin' }
          ]
        },
        {
          type: 'checkbox',
          name: 'interests',
          label: 'Interests',
          options: [
            { value: 'sports', label: 'Sports' },
            { value: 'music', label: 'Music' },
            { value: 'technology', label: 'Technology' }
          ]
        },
        {
          type: 'file',
          name: 'avatar',
          label: 'Avatar',
          accept: 'image/*'
        }
      ]
    };
  },
  methods: {
    handleSubmit() {
      console.log('Form submitted with data:', this.formData);
      // Handle form submission logic here
    },
    handleCancel() {
      this.formData = {}; // Reset the form data
      console.log('Form submission cancelled');
    }
  }
};
</script>

<style scoped>
/* Optional: Add styles for modal */
.fixed {
  z-index: 9999;
}
</style>
