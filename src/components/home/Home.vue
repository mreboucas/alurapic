<template>
  <div> 
    <img src="static/bart_nirvana.ico">
    <h3 class="centralizado">{{ titulo }}</h3>
    <!-- <img src="./assets/back_to_the_future.jpg" :alt="titulo" v-bind:title="foto.titulo" /> -->
    
    <!-- $event.target.value: faz o bindo do valor digitado para o campo: filtro -->
    <p v-show="mensagem" class="centralizado">{{mensagem}}</p>
    <input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="filtre por parte do título"/>

    <ul class="lista-fotos">
        <li class="lista-fotos-item" v-for="foto in fotosComFiltro" >
          

            
            <meu-painel :titulo="foto.titulo">
              
             <!-- <imagem-responsiva v-meu-transform="{incremento: 15, animate: true}" :url="foto.url" :titulo="foto.titulo"></imagem-responsiva> -->
              <imagem-responsiva v-meu-transform:scale.animate="1.2" :url="foto.url" :titulo="foto.titulo"></imagem-responsiva>
              <!-- <imagem-responsiva v-meu-transform.animate="15" :url="foto.url" :titulo="foto.titulo"></imagem-responsiva> -->
              <!--
               Não usou o :tipo e :rotulo pq não se trata de um data binding do campo para o atributo,
              mas sim do campo que está sendo passado para o componente 
              se enviar assim confirmacao="false" vai uma STRING,
              se for assim :confirmacao="false" vai um boloano,
              -->
              <router-link :to="{name: 'altera', params:{id: foto._id}}">
                <meu-botao 
                  tipo="button" 
                  rotulo="ALTERAR"
                  estilo="padrao"
                />
              </router-link>
              <meu-botao 
                tipo="button" 
                rotulo="REMOVER"
                @botaoAtivado="remove(foto, $event)"
                :confirmacao="true"
                estilo="perigo"
                />
                
                

            </meu-painel>
            
           
        </li>
    </ul> 
  </div>
</template>

<script>
import  Painel from '../shared/painel/Painel.vue'
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue'
import FotoService from '../../domain/foto/FotoService'

  export default {
  components: {
    'meu-painel' : Painel,
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao' : Botao
  },
  data() {

    return {
      titulo: 'Alura Pic',
      /*
      fotosList :[
        {
          url: require('./assets/back_to_the_future.jpg'),
          titulo : 'De volta para o futuro'
        },
        {
          url: require('./assets/senhor.jpg'),
          titulo : 'Senhor dos anéis'
        }
      ]
      */
      fotosList: [],

      filtro: '',
      mensagem : ''
    }
  },

  computed: {
    
    fotosComFiltro() {

      if (this.filtro) {

        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.fotosList.filter(foto => exp.test(foto.titulo));


      } else {
        
        return this.fotosList

      }


    }
  },

  methods:  {
    remove(foto, $event) {
      //alert($event);
        //alert('Foto removida: ' + foto.titulo)
        //this.$http.delete(`http://localhost:3000/v1/fotos/${foto._id}`)
  /** 
      this.resource
        .delete({id: foto._id}) */
        this.service.apaga(foto._id)
        .then(() => {
            
            let indice = this.fotosList.indexOf(foto);
            this.fotosList.splice(indice, 1)
            this.mensagem = 'Foto removida com sucesso'

          } , err => {
            console.log(err);
            this.mensagem = err.message;
          });

      /** 
        this.$http.delete(`/v1/fotos/${foto._id}`)
        .then(() => {
          
          let indice = this.fotosList.indexOf(foto);
          this.fotosList.splice(indice, 1)
          this.mensagem = 'Foto removida com sucesso'

        } , err => {
          console.log(err);
          this.mensagem = 'Não foi possível remover a foto';
        });
        **/
    }
 
  },

  created() {

    this.service = new FotoService(this.$resource);
  
    this.service
      .lista()
      .then(fotos => this.fotosList = fotos, err => {
          console.log(err)
          this.mensagem = err.message;
      });
    /**
      Código migrado para a classe FotoService

    //Criar variável global dinamicamente: resource
    this.resource = this.$resource('v1/fotos{/id}');

    this.resource
      .query() //vai até o parâmetro e para: v1/fotos
      .then(res => res.json())
      .then(fotos => this.fotosList = fotos, err => console.log(err)); 

     */

    //alert('Componente criado');
    /**
    let promise = this.$http.get('/v1/fotos')
      .then(res => res.json())
    .then(fotos => this.fotosList = fotos, err => console.log(err)); 
     */
  }
}

</script>
<!-- adiciona no head da página -->
<style lang="css">

  .centralizado {
     text-align: center;
  }

  .lista-fotos {
    list-style: none;
  }

  .lista-fotos .lista-fotos-item { 
    display: inline-block;
  }

.filtro {
  display: block;
  width: 100%;
}
</style>
