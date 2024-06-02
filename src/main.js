import { createApp } from 'vue'
import router from './router/index.js'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import excel from 'vue-excel-export'

import { createI18n } from 'vue-i18n';

import en from '../locales/en.json';
import ar from '../locales/ar.json';

const i18n = createI18n({
    legacy: false,
    locale: 'ar', // set default locale
    fallbackLocale: 'ar',
    messages: {
      en,
      ar
    }
  });

createApp(App).use(router).use(excel).use(i18n).mount('#app')
