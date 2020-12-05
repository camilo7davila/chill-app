import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Branches, BranchesMC, BranchesM } from 'src/app/core/interfaces/restaurant.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ModalMenuService } from 'src/app/core/services/modal/modal-menu.service';
import { BranchesRestaurantService } from 'src/app/core/services/restaurants/branches-restaurant.service';



import { Pipe, PipeTransform } from "@angular/core";


@Component({
  selector: 'app-branches-menu-categories',
  templateUrl: './branches-menu-categories.component.html',
  styleUrls: ['./branches-menu-categories.component.scss']
})
export class BranchesMenuCategoriesComponent implements OnInit {

  public menuCategories: BranchesMC[] = [];
  public categorie: BranchesMC[] = [];
  public menu: BranchesM[] = [];
  public idMenu: string;
  // public idMenuRestaurant: BranchesM;

  public isFilter: boolean;

  public restaurantsFilter: BranchesM[] = [];

  @Input() idBranchess: string;
  @Output() menuClick: EventEmitter<any> = new EventEmitter();


  constructor(
    private brancheRestaurantService: BranchesRestaurantService,
    private modalServiceM: ModalMenuService,
    private router: Router,
    private authService: AuthService
  ) {
    this.isFilter = false;
  }

  ngOnInit(): void {
    this.brancheRestaurantService.getBrachesMenuCategories(this.idBranchess)
      .subscribe(data => {
        // console.log('datos categoria menu', data);
        this.menuCategories = data
      })

    this.brancheRestaurantService.getBrachesMenu(this.idBranchess)
      .subscribe(data => {
        // console.log('datos del menu', data);
        this.menu = data
      })
  }

  menuSelect(menu) {
    this.authService.userIsLogged()
      .then((isLogged) => {
        if (isLogged) {
          this.authService.setCurrentUser(isLogged.email, isLogged.uid)
          this.modalServiceM.changeStateModalMenu(this.idBranchess, menu)
        } else {
          sessionStorage.setItem('urlUser', this.idBranchess);
          this.router.navigate(['/auth/login-phone'])
        }
      })
      .catch((e) => console.log(e))
  }

  // showCategorySelectedMenu(categorie:BranchesMC) {
  //   console.log('le hice click', categorie);
  //   this.menuCategories = this.menuCategories.map((category) => (this.categorie === category) ? { ...category, active: true } : { ...category, active: false })
  //   // console.log(this.menuCategories);
  // }



  // showCategorySelectedMenu(categorie:BranchesMC) {
  //   console.log('le hice click', categorie);
  //   this.menuCategories = this.menuCategories.map((category) => (this.categorie === category) ? { ...category, active: true } : { ...category, active: false })
  //   // console.log(this.menuCategories);
  // }

  // categorySelected() {
  //   this.isFilter = true;
  //   if (this.categorie === '!') {
  //     this.isFilter = false;
  //     return
  //   }
  //   this.restaurantsFilter = this.menu.filter(menuc => {
  //     if (menuc.menuCategoryId) {
  //       return menuc.menuCategoryId.find(categoryId => categoryId == this.menuCategories.id ? true : false)
  //     } else {
  //       return false;
  //     }
  //   })
  // }
}

