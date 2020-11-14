import { Component, OnInit } from '@angular/core';
import { Branches } from 'src/app/core/interfaces/restaurant.interface';
import { ModalService } from 'src/app/core/services/modal/modal.service';
import { BranchesRestaurantService } from 'src/app/core/services/restaurants/branches-restaurant.service';

@Component({
  selector: 'app-modal-restaurants-components',
  templateUrl: './modal-restaurants.component.html',
  styleUrls: ['./modal-restaurants.component.scss']
})
export class ModalRestaurantsComponent implements OnInit {

  public branchesFound: Branches[] = [];


  constructor(
    public modalService: ModalService,
    public branchesService: BranchesRestaurantService
  ) { }

  ngOnInit(): void {
    // console.log('este es el id desde modal',this.modalService.getIdRestaurantSelected);

    this.branchesService.getAllBranchesByIdRestaurant(this.modalService.getIdRestaurantSelected)
      .subscribe(data => {
        this.branchesFound = data;
        
      })
  }

}
