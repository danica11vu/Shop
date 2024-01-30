import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { environment } from "../../environment/environment";

@Injectable({providedIn:'root'})
export class DataStoreService{
    
    constructor(private http: HttpClient,
                private recipeService: RecipeService){
    }

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put(environment.fetchStore,
                        recipes).subscribe(response => {
                            console.log(response);
                        });
    }

    fetchRecipes(){
        this.http.get<Recipe[]>(environment.fetchStore)
        .subscribe(recipes =>{
            console.log(recipes);
            //this.recipeService.setRecipes(recipes);
        });
    }

}