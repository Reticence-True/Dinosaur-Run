import 'animate.css';
import 'virtual:svg-icons-register';
import { createApp } from 'vue';
import App from './App.vue';
import svgIcon from './components/svg-icon/index.vue';
import pinia from './stores';
import './styles/index.scss';

const app = createApp(App);

app.use(pinia).component('svg-icon', svgIcon).mount('#app');
