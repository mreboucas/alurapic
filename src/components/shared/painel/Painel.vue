<template>
    <div class="painel">
        <h2 class="painel-titulo" @dblclick="visivel = !visivel">{{ titulo }}</h2>
        <transition name="painel-fade">
        <!-- deve usar a tag slot dentro do painel para a tag img ser levada em consideração -->
            <div class="painel-conteudo" v-show="visivel">
              <slot></slot>
            </div>
            <!-- 
              <slot class="painel-conteudo" v-show="visivel"></slot>
            -->
        </transition>
        
    </div> 
</template>

<script>

  export default {
    props:['titulo'],

    data() {
      return {
        visivel: true
      }
    }
}

</script>
<!--scoped:  css só será aplicado para esse componente, não afetando o css da aplicação. -->
<style scoped>

  .painel {
    padding: 0 auto;
    border: solid 2px grey;
    display:inline-block;
    margin: 5px;
    box-shadow: 5px 5px 10px grey;
    width: 200px;
    height: 100%;
    vertical-align: top;
    text-align: center;
  }

  .painel .painel-titulo {
    text-align: center;
    border: solid 2px;
    backgroud: lightblue;
    margin: 0 0 15px 0;
    padding: 10px;
    text-transform: uppercase;
  }

  * {
    box-shadow: 5px 5px 10px black;
  }

  .painel-fade-enter, .painel-fade-enter-active {
    opacity: 0
  }

  .painel-fade-enter-active, .painel-fade-leave-active {
    transition: opacity .4s;
  }

  .painel-conteudo {
    overflow: hidden;
  }

  
</style>
