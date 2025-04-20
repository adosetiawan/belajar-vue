import { createApp } from 'vue'
import App from './App.vue'
import FooterNavComponent from './components/FooterNavComponent.vue';
import HeaderDefaultComponent from './components/HeaderDefaultComponent.vue';
import HeaderPageComponent from './components/HeaderPageComponent.vue';
import SectionTittleComponent from './components/SectionTittleComponent.vue';

import router from './routers/index';
const app = createApp(App)
app.component('FooterNavComponent', FooterNavComponent);
app.component('HeaderDefaultComponent', HeaderDefaultComponent);
app.component('HeaderPageComponent', HeaderPageComponent);
app.component('SectionTittleComponent', SectionTittleComponent);
app.use(router);
app.mount('#render-app')
