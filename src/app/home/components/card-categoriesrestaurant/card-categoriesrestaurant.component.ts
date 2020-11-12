import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Categories } from 'src/app/core/interfaces/restaurant.interface';

@Component({
  selector: 'app-card-categoriesrestaurant',
  templateUrl: './card-categoriesrestaurant.component.html',
  styleUrls: ['./card-categoriesrestaurant.component.scss']
})
export class CardCategoriesrestaurantComponent implements OnInit {

  @Input() categorie: Categories;
  @Output() selectCategory: EventEmitter<Categories> = new EventEmitter<Categories>();

  constructor() { }

  ngOnInit(): void {
  }

  selectedCategory() {
    this.selectCategory.emit(this.categorie);
  }
}
