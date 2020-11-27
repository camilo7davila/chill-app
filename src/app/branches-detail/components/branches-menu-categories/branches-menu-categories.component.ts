import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Branches, BranchesMC, BranchesM } from 'src/app/core/interfaces/restaurant.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ModalMenuService } from 'src/app/core/services/modal/modal-menu.service';
import { BranchesRestaurantService } from 'src/app/core/services/restaurants/branches-restaurant.service';

@Component({
  selector: 'app-branches-menu-categories',
  templateUrl: './branches-menu-categories.component.html',
  styleUrls: ['./branches-menu-categories.component.scss']
})
export class BranchesMenuCategoriesComponent implements OnInit {

  public menuCategories: BranchesMC[] = [];
  public menu: BranchesM[] = [];
  
  public idMenu:string;

  // public idMenuRestaurant: BranchesM;

  @Input() idBranchess: string;
  @Output() menuClick: EventEmitter<any> = new EventEmitter();


  constructor(
    private brancheRestaurantService: BranchesRestaurantService,
    private modalServiceM: ModalMenuService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.brancheRestaurantService.getBrachesMenuCategories(this.idBranchess)
      .subscribe(data => {
        this.menuCategories = data
      })

    this.brancheRestaurantService.getBrachesMenu(this.idBranchess)
      .subscribe(data => {
        this.menu = data
      })
  }

  menuSelect(menu) {
    this.authService.userIsLogged()
      .then((isLogged) => {
        if(isLogged) {
          this.authService.setCurrentUser(isLogged.email, isLogged.uid)
          this.modalServiceM.changeStateModalMenu(this.idBranchess, menu)
        } else {
          sessionStorage.setItem('urlUser', this.idBranchess);
          this.router.navigate(['/auth/login'])
        }
      })
      .catch((e) => console.log(e))
  }

}