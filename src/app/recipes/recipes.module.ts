import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { AppRoutingModule } from "../app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RecipesRouting } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";

@NgModule({
declarations: [
    RecipeListComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    RecipesComponent
],

imports: [
    AppRoutingModule, 
    ReactiveFormsModule, 
    RecipesRouting, 
    FormsModule, 
    SharedModule,
    RecipeDetailComponent
]
})
export class RecipesModule{

}