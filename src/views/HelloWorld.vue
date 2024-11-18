<!-- src/views/Home.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
    <!-- Navigation -->
    <nav class="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              YourBrand
            </router-link>
          </div>
          
          <div class="flex items-center gap-6">
            <router-link 
              v-for="(item, index) in navigation" 
              :key="index"
              :to="item.path"
              class="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {{ item.name }}
            </router-link>
            
            <router-link 
              to="/search"
              class="flex items-center gap-2 px-4 py-2 bg-white rounded-full border-2 border-gray-200 text-gray-700 hover:border-purple-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              Search
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Welcome to Your Modern Web Platform
          </h1>
          <p class="text-xl text-gray-600 mb-8">
            Create something amazing with our powerful and intuitive tools.
            Start your journey today.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl">
              Get Started
            </button>
            <button class="px-8 py-4 bg-white text-gray-700 rounded-full hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-white" v-if="feature.icon.template" v-html="feature.icon.template"></div>
            <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4 bg-white">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already creating amazing things with our platform.
        </p>
        <button class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl">
          Start Free Trial
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-50 border-t">
      <div class="max-w-6xl mx-auto px-4 py-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="(section, index) in footerSections" :key="index">
            <h4 class="font-semibold mb-4">{{ section.title }}</h4>
            <ul class="space-y-2">
              <li v-for="(link, linkIndex) in section.links" :key="linkIndex">
                <a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">
                  {{ link }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-12 pt-8 border-t text-center text-gray-600">
          © {{ new Date().getFullYear() }} YourBrand. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      navigation: [
        { name: 'Home', path: '/' },
        { name: 'Features', path: '/features' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'About', path: '/about' }
      ],
      features: [
        {
          title: 'Easy to Use',
          description: 'Intuitive interface designed for the best user experience.',
          icon: {
            template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>`
          }
        },
        {
          title: 'Powerful Features',
          description: 'Advanced tools to help you achieve your goals faster.',
          icon: {
            template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>`
          }
        },
        {
          title: 'Fast & Reliable',
          description: 'Built for speed and reliability you can count on.',
          icon: {
            template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>`
          }
        }
      ],
      footerSections: [
        {
          title: 'Product',
          links: ['Features', 'Pricing', 'Updates', 'Beta']
        },
        {
          title: 'Company',
          links: ['About', 'Careers', 'Contact', 'Partners']
        },
        {
          title: 'Resources',
          links: ['Blog', 'Newsletter', 'Events', 'Help center']
        },
        {
          title: 'Legal',
          links: ['Terms', 'Privacy', 'Cookies', 'Licenses']
        }
      ]
    }
  },
  mounted(){
    this.$api.get("v1/department/queue/list/all", {
      department_id: "06bf2cd6-9f52-bb96-a849-c932f628b90b"
    }).then((res)=>{
      console.log(res.data.data)
      // for (let i = 1; i <= 7; i++) {
        // setTimeout(() => {
          this.$project.successToast(`Ma'lumotlar olindi.`);
        //   this.$project.warningToast(`Something went wrong!${i}`);
        //   this.$project.infoToast(`Something went wrong!${i}`);
        // }, i * 1000);
      // }

    }).catch((err)=>{
      this.$project.errorToast(`Ma'lumotlarni olishda hatolik! ${err.message}`);

    })
  }
}
</script>

<style scoped>
.bg-clip-text {
  -webkit-background-clip: text;
}
</style>