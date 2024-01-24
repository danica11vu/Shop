import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";

export class ShoppingListService{
    ingredientChange = new Subject<Ingredient[]>();
    stratEditing = new Subject<number>();
    private ingredients:Ingredient[] = [
        new Ingredient('Apple', 1),
        new Ingredient('Pear', 3)];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredientById(index: number){
        return this.ingredients[index];
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

    updateIngrediant(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientChange.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index,1);
        this.ingredientChange.next(this.ingredients.slice());
    }
}