import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from '../../shared/ingredients.model';
import { NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListAction from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

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

  constructor(private store: Store<fromShoppingList.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe( stateData => {
      if(stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editIngredient = stateData.editedIngredient;
        this.editIngredientIndex = stateData.editedIngredientIndex;
        this.form.setValue({
          name: this.editIngredient.name,
          amount: this.editIngredient.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }
  
  onAddItem(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.store.dispatch(new ShoppingListAction.UpdateIngredient({index: this.editIngredientIndex, ingredient: newIngredient}));
    } else {
      this.store.dispatch(new ShoppingListAction.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }

  onClear(){
    this.form.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }

  onDelete(){
    this.store.dispatch(new ShoppingListAction.DeleteIngredient(this.editIngredientIndex));
    this.onClear();
  }
}
