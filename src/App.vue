<template>
  <div class="corpo"> 

    <nav>
      <ul>
        <!--com reload na página -->
        <!--
        <li><a href="">Home</a></li> 
        <li><a href="/cadastro">Cadastro</a></li> -->
        
        <!--sem fazer reload na página -->
        <!--
        <li><router-link to="/">Home</router-link></li> 
        <li><router-link to="/cadastro">Cadastro</router-link></li> 
        -->
        <li v-for="route in routes">
          <router-link v-if="route.menu" :to="route.path ? route.path : '/'">{{ route.titulo }}</router-link>
        </li>
      </ul>  
    </nav>
    
    <transition name="pagina">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>

import { routes } from './routes'

  export default {

    data() {

      return {

        routes

      }

    }
  
  }



</script>
<!-- adiciona no head da página -->
<style lang="css">
  .corpo {
    font-family: Helvetica, sans-serif;
    width: 96%;
    margin: 0 auto;
  }

  .pagina-enter, .pagina-enter-active {
    opacity: 0
  }

  .pagina-enter-active, .pagina-leave-active {
    transition: opacity .4s;
  }
</style>
