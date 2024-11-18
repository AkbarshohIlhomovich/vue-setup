<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div class="max-w-7xl mx-auto bg-white rounded-lg shadow-xl border border-gray-100">
        <!-- Header -->
        <div class="p-8 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <div class="h-8 w-8 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                {{ $l('translation.manager', 'Translation Manager') }}
              </h1>
              <p class="mt-2 text-gray-600">
                {{ $l('translation.description', 'Manage translations for all supported languages with automatic translation capabilities') }}
              </p>
            </div>
          </div>
        </div>
  
        <div class="p-8 space-y-6">
          <!-- Success Alert -->
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform -translate-y-2 opacity-0"
            enter-to-class="transform translate-y-0 opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="transform translate-y-0 opacity-100"
            leave-to-class="transform -translate-y-2 opacity-0"
          >
            <div v-if="showSuccess" class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p class="text-green-800">{{ $l('translation.success', 'Translation added successfully!') }}</p>
            </div>
          </Transition>
  
          <!-- Input Section -->
          <div class="flex gap-4 flex-wrap md:flex-nowrap">
            <div class="flex-1 space-y-4">
              <input
                v-model="newTranslationKey"
                type="text"
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                :placeholder="$l('translation.enter_key', 'Enter translation key')"
              />
              <input
                v-model="defaultTranslation"
                type="text"
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                :placeholder="$l('translation.enter_default', 'Enter English text')"
              />
            </div>
            <button
              @click="addNewTranslationWithAuto"
              class="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 h-[42px]"
            >
              <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              {{ $l('translation.add_key', 'Add & Translate') }}
            </button>
          </div>
  
          <!-- Action Buttons -->
          <div class="flex justify-end gap-3">
            <button
              @click="copyTranslationsToClipboard"
              class="px-4 py-2 border border-purple-200 hover:bg-purple-50 rounded-lg transition-colors duration-200 flex items-center gap-2 text-gray-700"
            >
              <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
              </svg>
              {{ $l('translation.copy_to_clipboard', 'Copy to Clipboard') }}
            </button>
  
            <button
              @click="generateTranslationsFile"
              class="px-4 py-2 border border-blue-200 hover:bg-blue-50 rounded-lg transition-colors duration-200 flex items-center gap-2 text-gray-700"
            >
              <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              {{ $l('translation.generate_file', 'Generate File') }}
            </button>
          </div>
  
          <!-- Translations Table -->
          <div class="rounded-lg border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[200px]">
                      {{ $l('translation.key', 'Translation Key') }}
                    </th>
                    <th
                      v-for="lang in supportedLanguages"
                      :key="lang"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <span class="px-2 py-1 rounded-full border border-gray-200 text-gray-600">
                        {{ getLanguageName(lang) }}
                      </span>
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">
                      {{ $l('translation.actions', 'Actions') }}
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="key in translationKeys" :key="key" class="hover:bg-gray-50 transition-colors duration-150">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {{ key }}
                    </td>
                    <td
                      v-for="lang in supportedLanguages"
                      :key="lang"
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      <textarea
                        v-model="translations[lang][key]"
                        rows="1"
                        class="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none overflow-hidden"
                        @input="autoGrow($event.target); handleTranslationChange(key, lang)"
                      ></textarea>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        @click="deleteTranslationKey(key)"
                        class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors duration-200"
                      >
                        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          <line x1="10" y1="11" x2="10" y2="17"/>
                          <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'TranslationManager',
    data() {
      return {
        translations: {},
        supportedLanguages: ['en', 'es', 'fr', 'de'],
        newTranslationKey: '',
        defaultTranslation: '',
        translationKeys: [],
        showSuccess: false
      };
    },
    created() {
      this.loadTranslations();
    },
    methods: {
      getLanguageName(code) {
        const names = {
          en: 'English',
          es: 'Español',
          fr: 'Français',
          de: 'Deutsch'
        };
        return names[code] || code.toUpperCase();
      },
      async autoTranslate(text, targetLang) {
        try {
          const response = await axios.get('https://api.mymemory.translated.net/get', {
            params: {
              q: text,
              langpair: `en|${targetLang}`
            }
          });
          return response.data.responseData.translatedText;
        } catch (error) {
          console.error('Translation error:', error);
          return text;
        }
      },
      async addNewTranslationWithAuto() {
        if (!this.newTranslationKey.trim() || !this.defaultTranslation.trim()) return;
        
        const key = this.newTranslationKey.trim();
        const defaultText = this.defaultTranslation.trim();
        
        // Add English text first
        if (!this.translations.en) this.translations.en = {};
        this.translations.en[key] = defaultText;
        
        // Auto-translate for other languages
        for (const lang of this.supportedLanguages) {
          if (lang === 'en') continue;
          if (!this.translations[lang]) this.translations[lang] = {};
          this.translations[lang][key] = await this.autoTranslate(defaultText, lang);
        }
        
        this.translationKeys = [...new Set([...this.translationKeys, key])];
        this.saveTranslations();
        
        this.newTranslationKey = '';
        this.defaultTranslation = '';
        
        // Show success message
        this.showSuccess = true;
        setTimeout(() => {
          this.showSuccess = false;
        }, 3000);
      },
      loadTranslations() {
        const savedTranslations = localStorage.getItem('translations');
        if (savedTranslations) {
          this.translations = JSON.parse(savedTranslations);
          this.translationKeys = Object.keys(this.translations.en || {});
        } else {
          this.supportedLanguages.forEach(lang => {
            this.translations[lang] = {};
          });
        }
      },
      saveTranslations() {
        localStorage.setItem('translations', JSON.stringify(this.translations));
      },
      async handleTranslationChange(key, lang) {
        if (lang === 'en') {
          // Auto-translate when English text changes
          const newText = this.translations.en[key];
          for (const targetLang of this.supportedLanguages) {
            if (targetLang === 'en') continue;
            this.translations[targetLang][key] = await this.autoTranslate(newText, targetLang);
          }
        }
        this.saveTranslations();
      },
      deleteTranslationKey(key) {
        if (confirm(this.$l('translation.confirm_delete', 'Are you sure you want to delete this translation key?'))) {
          this.supportedLanguages.forEach(lang => {
            delete this.translations[lang][key];
          });
          this.translationKeys = this.translationKeys.filter(k => k !== key);
          this.saveTranslations();
        }
      },
      generateTranslationsFile() {
        const content = `export default ${JSON.stringify(this.translations, null, 2)};`;
        const blob = new Blob([content], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'translations.js';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      },
      copyTranslationsToClipboard() {
        const content = `export default ${JSON.stringify(this.translations, null, 2)};`;
        navigator.clipboard.writeText(content)
          .then(() => {
            this.showSuccess = true;
            setTimeout(() => {
              this.showSuccess = false;
            }, 3000);
          })
          .catch(err => console.error('Failed to copy:', err));
      },
      autoGrow(element) {
        element.style.height = 'auto';
        element.style.height = (element.scrollHeight) + 'px';
      }
    }
  };
  </script>
  
  <style scoped>
  textarea {
    min-height: 2.5rem;
    transition: all 0.2s ease;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>