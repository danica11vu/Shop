import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit{
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  
  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router){
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        //console.log(this.editMode);
        this.initForm();
      }
    );
  }

  ingredientsForm(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm(){
    let recipeName = '';
    let recipeImgUrl = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    
    if(this.editMode){
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImgUrl = recipe.imagePath;
      recipeDescription = recipe.desc;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.min(1)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imageURL': new FormControl(recipeImgUrl, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit(){
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amont': new FormControl(null, [
          Validators.required,
          Validators.min(1)
        ])
      })
    )
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
