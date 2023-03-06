import { RecipeClass } from './../recipeClass';


export class RecipeControllerInputDTO {
    constructor(
        private title: string,
        private description: string,
    ) { }

    public getTitle() {
        return this.title
    }
    public getDescription() {
        return this.description
    }
}

export class CreationRecipeReturnDTO {
    constructor(
        private message: string,
        private recipe: RecipeClass
    ) { }
}

export class GetRecipeByIdInputDTO {
    constructor(
        private recipeId: string
    ) { }

    public getRecipeId() {
        return this.recipeId
    }
}

export class UpdateRecipeInputDTO{
    constructor(
     private recipeId:string,
     private title?:string,
     private description?:string
    ){}
    public getRecipeId(){
        return this.recipeId
    }
    public getTitle(){
        return this.title
    }
    public getDescription(){
        return this.description
    }
  
 }

export interface GetRecipeByIdReturnDTO {
    'ID da Receita': string,
    'Nome da Receita': string,
    'Modo de Preparo': string,
    'Receita enviada em': string,
    'Postado por': string,
    'ID do Autor':string
}