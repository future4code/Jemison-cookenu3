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

export class CreationRecipeReturnDTO{
    constructor(
        private message:string,
        private recipe:RecipeClass
    ){}
}