import { Component, OnInit } from '@angular/core';
import { BranchesM,MenuDatail} from 'src/app/core/interfaces/restaurant.interface';

import { ModalMenuService } from 'src/app/core/services/modal/modal-menu.service';

import { BranchesRestaurantService } from 'src/app/core/services/restaurants/branches-restaurant.service';

@Component({
  selector: 'app-modal-menu-detail',
  templateUrl: './modal-menu-detail.component.html',
  styleUrls: ['./modal-menu-detail.component.scss']
})
export class ModalMenuDetailComponent implements OnInit {
  public menuFound: BranchesM []=[];
  public idBranch: string;
  public menu: BranchesM;
  public menuData: MenuDatail[] = []; 

  constructor(
    public modalMenuService: ModalMenuService,
    public branchesService: BranchesRestaurantService
  ) { }

  ngOnInit(): void {
    this.idBranch = this.modalMenuService.getIdBranch;
    this.menu = this.modalMenuService.getIdMenuSelected;
    this.branchesService.getAllMenusByIdMenu(this.idBranch, this.menu.id)
      .subscribe(data => {
        this.menuData = data;
      })
  }

}
