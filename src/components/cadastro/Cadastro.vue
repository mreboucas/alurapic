<template> 
    <div>   
        <h2 class="centralizado">Cadastro</h2>
        <h2 class="centralizado">{{ foto.titulo }}</h2>

        <h2 v-if="foto._id" class="centralizado">Alterando</h2>
        <h2 v-else class="centralizado">Incluindo</h2>

        <form @submit.prevent="grava()">
        
            <div class="controle">
                <label for="tituto">TÍTULO</label>
                <!--
                <input id="titulo" autocomplete="off"
                     @input="foto.titulo = $event.target.value" :value="foto.titulo"/> -->
                <input data-vv-as="título" name="titulo" id="titulo" v-validate data-vv-rules="required|min:3|max:30" autocomplete="off" v-model="foto.titulo"/>
                <!-- propriedade errors criada automaticamente pelo vue-validate -->
                <span class="erro" v-show="errors.has('titulo')" >{{ errors.first('titulo') }}</span>
                     
            </div>   

            <div class="controle">
                <label for="url">URL</label>
                <!--
                <input id="url" autocomplete="off"
                       @input="foto.url = $event.target.value" :value="foto.url"/>
                <imagem-responsiva/> -->

                <input name="url" id="url" v-validate data-vv-rules="required" autocomplete="off" v-model="foto.url"/>
                <!-- propriedade errors criada automaticamente pelo vue-validate -->
                <span class="erro" v-show="errors.has('url')">Url obrigatório</span>
                <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo"/>
            </div>   

            <div class="controle">
                <label for="descricao">DESCRIÇÃO</label>
                <!--
                <textarea id="descricao" autocomplete="off"
                         @input="foto.descricao = $event.target.value" :value="foto.descricao">
                </textarea>     -->
                <textarea id="descricao" autocomplete="off" v-model="foto.descricao">
                </textarea>    
            </div>  

            <div class="centralizado">
                <meu-botao rotulo="GRAVAR" tipo="submit"/>
                <router-link to="/"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
            </div>

        </form>

    </div>

</template> 

</component>


<script>
    import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
    import Botao from '../shared/botao/Botao.vue';
    import Foto from '../../domain/foto/Foto'
    import FotoService from '../../domain/foto/FotoService'

export default {

    components: {

        'imagem-responsiva' : ImagemResponsiva,
        'meu-botao': Botao

    },

    data() {

        return {
            
            foto : new Foto(),
            //capurta o parâmetro da url -> rota. Ex.: /cadastro/:id
            //id: this.$route.params.cod --> //Ex.: /cadastro/:cod
            
            //route --> acessa os parâmetros da rota
            //router --> a rota propriamente dita...

            id: this.$route.params.id
        }
    },

    methods: {

        grava() {
            this.$validator
                .validateAll()
                .then(success => {

                    if (success) {
                        
                        /**migrado para a classe de service this.resource.save(this.foto) */
                        this.service
                            .cadastra(this.foto)
                            .then(() => {
                                //Redirect to home quando for edição.
                                if (this.id) {
                                    this.$router.push({ name: 'home' });
                                }
                                //limpa formulário
                                this.foto = new Foto()
                            }, err => console.log(err));

                        console.log('epa!');
                        console.log(this.foto);
                        this.foto =  new Foto();
                        /**
                        this.$http.post('http://localhost:3000/v1/fotos', this.foto)
                        .then(() => this.foto = new Foto(), err => console.log(err));
                        */

                    }

                })
           }
    },

    created() {
        //this.resource = this.$resource('v1/fotos');
        this.service = new FotoService(this.$resource);

        if (this.id) {
            this.service
                .busca(this.id)
                .then(foto => this.foto = foto);
        }
    }
}

</script>


<style scoped>
    .centralizado {
        text-align : center%
    }

    .erro {
       color:red; 
    }
    
</style>

