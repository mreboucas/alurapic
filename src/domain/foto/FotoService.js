//Essa camada serve para isolarmos $http e $resource
export default class FotoService {

    constructor(resource) {
        //atributo privado: _resource
        this._resource = resource('v1/fotos{/id}');
        
    }

    lista() {


    return this._resource
        .query() //vai até o parâmetro e para: v1/fotos
        .then(res => res.json(), err => {
            console.log(err);
            throw new Error('Não foi possível obter as fotos. Tente novamente mais tarde.');

        });
        //Essa promisse fica na classe que está invocando o método de listar
        //.then(fotos => this.fotosList = fotos, err => console.log(err));
        ;

    }

    cadastra(foto) {
        //return this._resource = this.resource.save(this.foto) 

        if (foto._id) {

            return this._resource
                .update({ id: foto._id}, foto);

        } else {

            return this._resource
                .save(foto);

        }
    }

    apaga(id) {

        return this._resource.delete({id})
        .then(null, err => {
            console.log(err);
            throw new Error('Não foi possível remover as fotos');
        });
    }

    busca(id) {

        return this._resource
        .get ({ id })
        .then(res => res.json());
    }

}