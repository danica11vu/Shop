import { Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListAction from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Observable<{ingredients: Ingredient[]}>;
  changeSub: Subscription;

  constructor(private store: Store<fromShoppingList.AppState>) {}
  
  ngOnInit(){
    this.ingredients = this.store.select('shoppingList');
    }

  ngOnDestroy(): void {
    //this.changeSub.unsubscribe();
  }

  onEditItem(index: number){
    this.store.dispatch(new ShoppingListAction.StartEdit(index));
  }
}
