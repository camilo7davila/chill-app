import { Component, OnInit, Input } from '@angular/core';
import { Branches, BranchesMC } from 'src/app/core/interfaces/restaurant.interface';
import { BranchesRestaurantService } from 'src/app/core/services/restaurants/branches-restaurant.service';

@Component({
  selector: 'app-branches-menu-categories',
  templateUrl: './branches-menu-categories.component.html',
  styleUrls: ['./branches-menu-categories.component.scss']
})
export class BranchesMenuCategoriesComponent implements OnInit {

  public menuCategories:BranchesMC[]=[];

  @Input() idBranchess: string;

  constructor(
    private brancheRestaurantService: BranchesRestaurantService,
  ) { }

  ngOnInit(): void {
    // console.log(this.idBranchess);
    this.brancheRestaurantService.getBrachesMenuCategories(this.idBranchess)
      .subscribe(data => {
        console.log('menucategoriasss',data);
        this.menuCategories = data
        console.log('menucat',this.menuCategories);   
      })
  }
}