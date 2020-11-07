import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categories } from 'src/app/core/interfaces/restaurant.interface';

@Component({
  selector: 'app-categories-restaurant',
  templateUrl: './categories-restaurant.component.html',
  styleUrls: ['./categories-restaurant.component.scss']
})
export class CategoriesRestaurantComponent implements OnInit {

  @Input() categories: Categories[] = [];
  @Output() categorySelected: EventEmitter<Categories> = new EventEmitter<Categories>();

  constructor() { }

  ngOnInit(): void {
  }

  showCategorySelected(event: Categories) {
    this.categorySelected.emit(event)
    this.categories = this.categories.map((category) =>  (event.id === category.id) ? {...category, active: true} : {...category, active: false}) 
  }

}
