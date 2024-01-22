import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css'
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput')amountInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService){
  }

  onAddItem(){
    const newName = this.nameInputRef.nativeElement.value;
    const newAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(newName, newAmount);
    this.shoppingListService.addIngredient(newIngredient);
  }
}
