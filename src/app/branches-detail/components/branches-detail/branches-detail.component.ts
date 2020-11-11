import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Branches, Restaurant } from 'src/app/core/interfaces/restaurant.interface';
import { BranchesRestaurantService } from 'src/app/core/services/restaurants/branches-restaurant.service';

import { RestaurantsService } from 'src/app/core/services/restaurants/restaurants.service';

@Component({
  selector: 'app-branches-detail',
  templateUrl: './branches-detail.component.html',
  styleUrls: ['./branches-detail.component.scss']
})
export class BranchesDetailComponent implements OnInit {

  public branchRestaurant: Branches;
  public restaurant: Restaurant;
  

  constructor(
    private route: ActivatedRoute,
    private brancheRestaurantService: BranchesRestaurantService,
    private restaurantService: RestaurantsService
  ) { }

  ngOnInit(): void {

    // Doble subscribe es mala practica se reemplaza codigo
    // this.route.params.subscribe(params => {
    //   this.idBranches = params.idBranch;
    //   this.detailServices.getBrachesDetail(this.idBranches).subscribe(data =>{
    //     console.log('algooooo',data);
    //   });
    // });

    this.route.params.pipe(
      switchMap(({idBranch}) => this.brancheRestaurantService.getBrachesDetail(idBranch)),
    ).subscribe((brachRestaurant) => {
      this.restaurantService.getRestaurantById(brachRestaurant.restaurantId).subscribe((restaurant) =>{
        this.branchRestaurant = brachRestaurant;
        this.restaurant = restaurant;
      })
    })

  }

 

}
