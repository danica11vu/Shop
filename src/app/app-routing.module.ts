import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { AuthComponent } from "./auth/auth/auth.component";
import { SignalsComponent } from "./signals/signals.component";

const routes: Routes = [
    { path: '', pathMatch: 'full' , redirectTo: '/recipes'},
    { path: 'shopping-list', component: ShoppingListComponent},
    { path: "auth", component: AuthComponent},
    { path: "signals", component: SignalsComponent}
    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}