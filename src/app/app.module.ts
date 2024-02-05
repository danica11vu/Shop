import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from './shorten.pipe';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth/auth.component';
import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { SignalsComponent } from './signals/signals.component';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    ShortenPipe,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RecipesModule,
    SharedModule,
    CoreModule,
    SignalsComponent,
    StoreModule.forRoot({shoppingList: shoppingListReducer})
  ],
  exports: [ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
