import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";

export class ShoppingListService{
    ingredientChange = new Subject<Ingredient[]>();
    private ingredients:Ingredient[] = [
        new Ingredient('Apple', 1),
        new Ingredient('Pear', 3)];

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChange.next(this.ingredients.slice());
    }

    addIngredinets(ingredients: Ingredient[]){
        // for (let ingredinet of this.ingredients) {
        //     this.addIngredient(ingredinet);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientChange.next(this.ingredients.slice());
    }
}