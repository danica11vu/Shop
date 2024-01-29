import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{
    selectedRecipe = new EventEmitter<Recipe>();
    recipesChange = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'First Recipe', 
            'Description for first recipe', 
            'https://www.eatingwell.com/thmb/zvHrm_Z8F2qLeJenpJ6lYodtq7M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/57831531-73819d8ce8f5413cac42cf1c907bc37a.jpg',
            [
                new Ingredient('Orange', 2),
                new Ingredient('Watermelon', 9)
            ]),
        new Recipe('Second Recipe',
         'Description for second recipe',
        'https://www.eatingwell.com/thmb/zvHrm_Z8F2qLeJenpJ6lYodtq7M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/57831531-73819d8ce8f5413cac42cf1c907bc37a.jpg',
        [
            new Ingredient('Apricot', 2),
            new Ingredient('Melon', 5)
        ])
      ];

    constructor(private shoppingListService: ShoppingListService){
    }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChange.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredinets(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChange.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChange.next(this.recipes.slice());
    }

    delteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChange.next(this.recipes.slice());
    }

    getRecipeById(index: number){
        return this.recipes[index];
    }
}