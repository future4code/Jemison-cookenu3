

export class RecipeClass {
    constructor(
        private id: string,
        private title: string,
        private description: string,
        private author_id_fk: string
    ) { }
    
    public getId() {
        return this.id
    }
    public setId(newId: string) {
        this.id = newId
    }

    public getTitle() {
        return this.title
    }
    public setTitle(newTitle: string) {
        this.title = newTitle
    }

    public getDescription() {
        return this.description
    }
    public setDescription(newDescription: string) {
        this.description = newDescription
    }

    public getAuthorId() {
        return this.author_id_fk
    }
    public setAuthorId(newAuthorId: string) {
        this.author_id_fk = newAuthorId
    }

}