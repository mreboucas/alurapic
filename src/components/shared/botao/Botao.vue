<template>
    <!-- class="padrao" : define uma classe default e :class: vai na computed property e add no class outra classe passada pelo componente -->     
    <button @click="disparaAcao()" class="botao" :class="estidoDoBotao" :type="tipo"> {{ rotulo }}</button>
</template>

<script>



export default {

//props:['tipo', 'rotulo', 'confirmacao', 'estilo']

    props: {

        tipo: {
            required: true,
            type: String
        },

        rotulo: {
            required: true,
            type: String
        },

        confirmacao : Boolean,
        estilo: String
    },
    methods: {

        disparaAcao($event) {

            if (this.confirmacao) {
                
                if (confirm('Confirma a exclusão?')) {
                    this.$emit('botaoAtivado', new Date());
                } 
            } else {
                    this.$emit('botaoAtivado');
            }
        }
    },

    computed: {
        estidoDoBotao() {

            if (this.estilo == 'padrao') {
                return 'botao-padrao'
            }

            if (this.estilo == 'perigo') {
                return 'botao-perigo'
            }
        }
    }
}

</script>

<style lang="sass">
    @import './Botao.scss';
</style>
