import { Component, OnInit, Input} from '@angular/core';
import { Categories } from 'src/app/core/interfaces/restaurant.interface';

@Component({
  selector: 'app-card-categoriesrestaurant',
  templateUrl: './card-categoriesrestaurant.component.html',
  styleUrls: ['./card-categoriesrestaurant.component.scss']
})
export class CardCategoriesrestaurantComponent implements OnInit {

  @Input () categorie1: Categories;

  constructor() { }

  ngOnInit(): void {
  }

}
