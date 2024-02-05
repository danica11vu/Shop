import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredients.model";

export const ADD_INGREDIENT = 'ADD_INGEDIENT';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDINET';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class AddIngredient implements Action{
    readonly type = ADD_INGREDIENT;
    
    constructor(public payload: Ingredient) {}
}

export class UpdateIngredient implements Action{
    readonly type = UPDATE_INGREDIENT;

    constructor(public payload: {index: number, ingredient: Ingredient}) {}
}

export class DeleteIngredient implements Action{
    readonly type = DELETE_INGREDIENT;

    constructor(public payload: number) {}
}

export class StartEdit implements Action{
    readonly type = START_EDIT;

    constructor( public payload: number) {}
}

export class StopEdit implements Action{
    readonly type = STOP_EDIT;
}

export type ShoppingListAction = AddIngredient | UpdateIngredient | DeleteIngredient | StartEdit | StopEdit; 