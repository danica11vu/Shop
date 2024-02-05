import { Ingredient } from "../../shared/ingredients.model";
import * as ShoppingListAction from "./shopping-list.actions";

export interface State{
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

export interface AppState{
    shoppingList: State;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apple', 1),
        new Ingredient('Pear', 3)],
    editedIngredient: null,
    editedIngredientIndex: -1
    
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListAction.ShoppingListAction) {
    switch(action.type){
        case ShoppingListAction.ADD_INGREDIENT: 
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListAction.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[action.payload.index];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[action.payload.index] = updatedIngredient;
            return{
                ...state, 
                ingredients: updatedIngredients
            };
        case ShoppingListAction.DELETE_INGREDIENT:
            return{
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== action.payload;
                })
            };
        case ShoppingListAction.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
            };
        case ShoppingListAction.STOP_EDIT:
            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        default: 
            return state;

    }

}