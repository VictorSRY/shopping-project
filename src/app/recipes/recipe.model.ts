import { Ingredient } from '../shared/ingredient.model'

export class Recipe{
    public id:number
    public name: string
    public description: string
    public image: string
    
    constructor( id:number, name: string,desc: string,image: string, public ingredients:Ingredient[]){
        this.id=id
        this.name=name
        this.description=desc
        this.image=image
    }
}