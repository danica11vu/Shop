import { Component, OnDestroy, OnInit} from '@angular/core';
import { DataStoreService } from '../shared/data-store.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  private userSub: Subscription;
  isAuth = false;
  
  constructor(private dataStoreService: DataStoreService,
              private authService: AuthService){
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuth = !user ? false : true;
    });
  }
  
  onSaveData(){
    this.dataStoreService.storeRecipes();
  }

  onFetchData(){
    this.dataStoreService.fetchRecipes();
  }

  onLogOut(){
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
