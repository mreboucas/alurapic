import Vue from 'vue'
import App from './App.vue'
/*import VueResourse from 'vue-resource' */
import VueResourse from 'vue-resource'

import VueRouter from 'vue-router'

/**como não foi utilizado o export default dentro de router.vue deve ser utilizado {} para cercar o componente router */
import { routes } from './routes'

/** Diretiva */
import './directives/Transform';
import VeeValidate from 'vee-validate';
import msg from './pt_BR';
//Precisa estar no escopo global -> webpack.config.js
import 'jquery/dist/jquery.js'
//Importa do node_modules - string sem ponto no início
import 'bootstrap/dist/css/bootstrap.css'

//Importa do diretório específico - string com ponto no início
import './assets/css/teste.css'
import './assets/js/teste.js';

Vue.use(VueResourse);
//definir o prefixo para invocar o rest de forma mais enxuta
Vue.http.options.root = 'http://localhost:3000'
Vue.use(VueRouter);

//Vue.use(VeeValidate);

const router = new VueRouter({
  //routes: routes
  /** Em ES6 qnd a prop e o valor são iguais, pode deixar apenas um */
  routes,
  node: 'history' /**eliminar o # da url do nagevador */
});

Vue.use(VeeValidate, {

  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
});

new Vue({
  el: '#app',
  /** Em ES6 qnd a prop e o valor são iguais, pode deixar apenas um */
  //router: router,
  router,
  render: h => h(App)
});