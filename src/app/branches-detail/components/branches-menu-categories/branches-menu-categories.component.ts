import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Branches, BranchesMC, BranchesM } from 'src/app/core/interfaces/restaurant.interface';
import { BranchesRestaurantService } from 'src/app/core/services/restaurants/branches-restaurant.service';

@Component({
  selector: 'app-branches-menu-categories',
  templateUrl: './branches-menu-categories.component.html',
  styleUrls: ['./branches-menu-categories.component.scss']
})
export class BranchesMenuCategoriesComponent implements OnInit {

  public menuCategories: BranchesMC[] = [];
  public menu: BranchesM[] = [];

  // public idMenuRestaurant: BranchesM;

  @Input() idBranchess: string;
  @Output() menuClick: EventEmitter<any> = new EventEmitter();


  constructor(
    private brancheRestaurantService: BranchesRestaurantService,

    // private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // console.log(this.idBranchess);
    this.brancheRestaurantService.getBrachesMenuCategories(this.idBranchess)
      .subscribe(data => {
        // console.log('menucategoriasss', data);
        this.menuCategories = data
        // console.log('menucat', this.menuCategories);
      })

    this.brancheRestaurantService.getBrachesMenu(this.idBranchess)
      .subscribe(data => {
        // console.log('menufinal', data);
        this.menu = data
        console.log('menuasignado', this.menu);
      })
  }



  menuSelect() {
    this.menuClick.emit('Este dato viajará hacia el padre');
    // this.menuClick.emit(this.menu);
    // console.log('quiero ver algo',this.menu);
  }
}