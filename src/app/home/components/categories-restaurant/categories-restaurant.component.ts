import { Component, Input, OnInit } from '@angular/core';
import { Categories } from 'src/app/core/interfaces/restaurant.interface';

@Component({
  selector: 'app-categories-restaurant',
  templateUrl: './categories-restaurant.component.html',
  styleUrls: ['./categories-restaurant.component.scss']
})
export class CategoriesRestaurantComponent implements OnInit {

  @Input () categories : Categories[]=[]; 

  constructor() { }

  ngOnInit(): void {
    // console.log('categoriasss',this.categories)
  }

}
