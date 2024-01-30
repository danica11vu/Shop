import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesComponent } from "./recipes.component";

const routes: Routes = [
    { path: 'recipes', component: RecipesComponent,},
    { path: "recipes/new", component: RecipeEditComponent},
    { path: "recipes/:id", component: RecipeDetailComponent},
    { path: "recipes/:id/edit", component: RecipeEditComponent},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})
export class RecipesRouting{

}