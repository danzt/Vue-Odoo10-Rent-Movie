import Vue from 'vue';
import Vuetify from 'vuetify'
import Home from './components/Home';
import store from './store'
import 'vuetify/dist/vuetify.min.css';
import VeeValidate from 'vee-validate';

Vue.use(Vuetify);
Vue.use(VeeValidate);
Vue.component('home', Home);

new Vue({
	el: '#app',
  	store,
	render: h => h(Home)
});
