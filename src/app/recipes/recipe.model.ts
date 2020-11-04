import { Ingredient } from '../shared/ingredient.model'

export class Recipe{
    public name: string
    public description: string
    public image: string
    
    constructor( name: string,desc: string,image: string,public ingredients:Ingredient[]){
        this.name=name
        this.description=desc
        this.image=image
    }
}