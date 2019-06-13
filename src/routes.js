//import Cadastro from './components/cadastro/Cadastro.vue'
//Lazy and loading & code spliting de componente -> carrega sob demanda (maior performance para quando o arquivo build.js ficar maior que 300kb)
const Cadastro = () => System.import('./components/cadastro/Cadastro.vue')
//import Home from './components/home/Home.vue'
const Home = () => System.import('./components/home/Home.vue')

/** para exportar uma variável ela deve ser constante */
export const routes = [
    {path: '', name:'home', component: Home, titulo:'Home', menu: true},
    {path: '/cadastro', name:'cadastro', component: Cadastro, titulo: 'Cadastro', menu:true},
    {path: '/cadastro/:id', name:'altera', component: Cadastro, titulo: 'Cadastro', menu:false},
    {path: '*', component: Home, menu: false},


]