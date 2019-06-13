<template>
  <img class="imagem-responsiva" :src="url" v-bind:alt="titulo" v-bind:title="titulo"/>

</template>

<script>
export default {
  props: ['url', 'titulo']
}

</script>


<style scoped>

.imagem-responsiva {
  width: 100%;
}


</style>