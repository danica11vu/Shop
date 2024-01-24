import { Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients:Ingredient[];
  changeSub: Subscription;

  constructor(private shopListService: ShoppingListService){
  }
  
  ngOnInit(){
    this.ingredients = this.shopListService.getIngredients();
    this.changeSub = this.shopListService.ingredientChange.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
      );
    }

  ngOnDestroy(): void {
    this.changeSub.unsubscribe();
  }

  onEditItem(index: number){
    this.shopListService.stratEditing.next(index);
  }
}
