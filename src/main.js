import { createApp } from 'vue'
import App from '@/App.vue'
import { registerPlugins } from '@core/utils/plugins'
import router from './router';
import { createPinia } from 'pinia';

// Styles
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'

// Create vue app
const app = createApp(App)


// Register plugins
registerPlugins(app)

// Use router
app.use(router);

// Use pinia
app.use(createPinia());

// Mount vue app
app.mount('#app')
