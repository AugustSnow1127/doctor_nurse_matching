import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap' // Import js file
import 'bootstrap/dist/css/bootstrap.min.css' // Import css file

createApp(App).use(store).use(router).mount('#app')
