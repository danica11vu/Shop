import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({providedIn:'root'})
export class DataStoreService{
    
    constructor(private http: HttpClient,
                private recipeService: RecipeService){
    }

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-book-afe3a-default-rtdb.firebaseio.com/recipes.json',
                        recipes).subscribe(response => {
                            console.log(response);
                        });
    }

    fetchRecipes(){
        this.http.get<Recipe[]>('https://recipe-book-afe3a-default-rtdb.firebaseio.com/recipes.json')
        .subscribe(recipes =>{
            console.log(recipes);
            //this.recipeService.setRecipes(recipes);
        });
    }

}