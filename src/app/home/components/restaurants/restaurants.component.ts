import { Component, OnInit } from '@angular/core';
import { Categories, Restaurant } from 'src/app/core/interfaces/restaurant.interface';
import { RestaurantsService } from 'src/app/core/services/restaurants/restaurants.service';

import { CategoriesRestaurantsService } from 'src/app/core/services/restaurants/categories-restaurants.service'
import { map } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QrCodeService } from 'src/app/core/services/qrCode/qr-code.service';
import { BranchesRestaurantService } from 'src/app/core/services/restaurants/branches-restaurant.service';
import { ModalService } from 'src/app/core/services/modal/modal.service';


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],

})
export class RestaurantsComponent implements OnInit {

  public restaurants: Restaurant[] = [];
  public restaurantsFilter: Restaurant[] = [];
  public isFilter: boolean;
  public showModal: boolean = false;

  public Categories: any;

  public branchesFind: string

  constructor(
    private restaurantsServices: RestaurantsService,
    private categoriesRestaurantCategories: CategoriesRestaurantsService,
    private BRS: BranchesRestaurantService,
    private modalService: ModalService,
    private qrCodeService: QrCodeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isFilter = false;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      const keysParams = Object.keys(params).length !== 0;
      keysParams ? this.redirectToBranches(params) : this.getDataRestaurants();
    })

    // this.BRS.getAllBranches().subscribe(data => console.log('sucursal',data))

    // this.BRS.getAllBranchesId().subscribe(data => console.log('idpruebasurcursal', data))


    // .subscribe(restaurant => {
    //     this.restaurants = restaurant
    //   })

  }

  getDataRestaurants() {
    this.restaurantsServices.getAllRestaurants()
      .subscribe(restaurant => {
        this.restaurants = restaurant
      })

    this.categoriesRestaurantCategories.getAllCatergories()
      .pipe(
        map(categories => {
          return categories.map(category => ({ ...category, active: false }))
        })
      )
      .subscribe(categories => {
        this.Categories = categories;
      })
  }

  redirectToBranches(params) {
    this.qrCodeService.getQrCodeById(params.qrcode).subscribe(qrCode => {
      if (qrCode) {
        this.router.navigate(['/restaurant', 'SXfHCGeCwpwH0bhwZcLd'])
      } else {
        this.getDataRestaurants();
      }
    }, err => {
      console.log(err);
    })
  }

  categorySelected(event: Categories) {
    this.isFilter = true;
    if (event.id === '!') {
      this.isFilter = false;
      return
    }
    this.restaurantsFilter = this.restaurants.filter(restaurant => {
      if (restaurant.restaurantCategoriesId) {
        return restaurant.restaurantCategoriesId.find(categoryId => categoryId == event.id ? true : false)
      } else {
        return false;
      }
    })
  }

  showModalRestaurant(idRestaurant) {
    this.modalService.changeStateModal(idRestaurant)
  }

}
