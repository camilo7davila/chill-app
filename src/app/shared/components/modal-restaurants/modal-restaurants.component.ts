import { Component, OnInit } from '@angular/core';
import { Branches, Restaurant } from 'src/app/core/interfaces/restaurant.interface';
import { ModalService } from 'src/app/core/services/modal/modal.service';

@Component({
  selector: 'app-modal-restaurants-components',
  templateUrl: './modal-restaurants.component.html',
  styleUrls: ['./modal-restaurants.component.scss']
})
export class ModalRestaurantsComponent implements OnInit {

  constructor(
    public modalService: ModalService
  ) { }

  ngOnInit(): void {
    console.log('este es el id desde modal',this.modalService.getIdRestaurantSelected);
  }

}
