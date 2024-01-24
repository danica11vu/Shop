import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from '../../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css'
})
export class ShoppingListEditComponent implements OnInit, OnDestroy{
  subscription: Subscription;
  @ViewChild('form') form: NgForm;
  editMode = false;
  editIngredientIndex: number;
  editIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService){
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.stratEditing.subscribe(
      (index: number) => {
        this.editIngredientIndex = index;
        this.editMode = true;
        this.editIngredient = this.shoppingListService.getIngredientById(this.editIngredientIndex);
        this.form.setValue({
          name: this.editIngredient.name,
          amount: this.editIngredient.amount
        }
        );
      }
    );
  }
  
  onAddItem(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngrediant(this.editIngredientIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClear(){
    this.form.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editIngredientIndex);
    this.onClear();
  }
}
