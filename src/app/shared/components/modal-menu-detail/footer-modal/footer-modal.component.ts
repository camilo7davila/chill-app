import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

import { ModalMenuService } from 'src/app/core/services/modal/modal-menu.service';
import { BranchesM, MenuDatail } from 'src/app/core/interfaces/restaurant.interface';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ShoppingCartService } from 'src/app/core/services/cart/shopping-cart.service';
import { take } from 'rxjs/operators';

import { BranchesRestaurantService } from 'src/app/core/services/restaurants/branches-restaurant.service';

@Component({
  selector: 'app-footer-modal-component',
  templateUrl: './footer-modal.component.html',
  styleUrls: ['./footer-modal.component.scss']
})
export class FooterModalComponent implements OnInit, OnChanges {
  @Input() mainForm: MenuDatail;

  public menu: BranchesM;

  //Seleccion de footer
  public totalPrice: number;
  public quantityTotal: number;
  public valueDish: number;

  //Selecciones del usuario
  public totalOptions: number;
  public totalAdditions: number;
  public totalSideDish: number;
  public uidUser: string;
  public isThereORderInCart: boolean;
  dataCartShopping: any;

  public databranche: any;

  constructor(
    private route: ActivatedRoute,
    public modalMenuService: ModalMenuService,
    private cartService: CartService,
    private authService: AuthService,
    private shoppinCartService: ShoppingCartService,
    private brancheRestaurantService: BranchesRestaurantService,
  ) {
    this.totalPrice = 0;
    this.quantityTotal = 1;
    this.valueDish = 0;
    this.isThereORderInCart = false
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calcTotalOptions();
    this.calcTotalAdditions();
    this.calcTotalSideDish();
    this.mainForm.idBranch = this.modalMenuService.getIdBranch;
  }

  ngOnInit(): void {
    this.menu = this.modalMenuService.getIdMenuSelected;
    // console.log(this.menu)
    this.totalPrice = this.menu.price;
    this.valueDish = this.menu.price;
    this.uidUser = this.authService.currentUserUid;
    this.getShoppingCartByUser(this.uidUser)

  }

  //Obtener carrito de compras del usuario
  getShoppingCartByUser(uid: string) {
    this.shoppinCartService.getShoppingCartByIdUser(uid, this.modalMenuService.getIdBranch).subscribe((dataCart) => {
      console.log(dataCart);
      this.isThereORderInCart = dataCart ? true : false;
      this.dataCartShopping = this.isThereORderInCart ? dataCart : false
    })
  }

  //Metodos que vienen cuando cambia formulario
  calcTotalOptions() {
    this.totalOptions = 0;
    const { options } = this.mainForm;
    const items = options.map(option => option.items);
    if (items.length === 0) {
      this.calcTotal();
      return
    }
    let joinItems = items.reduce((a, b) => a.concat(b), []);
    const sumItems = (invoiceAmount, nextItem) => invoiceAmount + nextItem.price;
    this.totalOptions = joinItems.reduce(sumItems, 0);
    this.calcTotal();
  }

  calcTotalAdditions() {
    this.totalAdditions = 0;
    const { additions } = this.mainForm;
    if (additions.length === 0) {
      this.calcTotal();
      return;
    }
    const sumAdditions = (invoiceAmount, nextAddition) => invoiceAmount + (nextAddition.total * nextAddition.price);
    this.totalAdditions = additions.reduce(sumAdditions, 0);
    this.calcTotal()
  }

  calcTotalSideDish() {
    this.totalSideDish = 0;
    const { sideDish } = this.mainForm;
    const items = sideDish.map(side => side.items);
    if (items.length === 0) {
      this.calcTotal();
      return
    }
    let joinItems = items.reduce((a, b) => a.concat(b));
    const sumItems = (invoiceAmount, nextItem) => invoiceAmount + (nextItem.price * nextItem.total);
    this.totalSideDish = joinItems.reduce(sumItems, 0);
    this.calcTotal();
  }


  //Metodos cambio de quantityDish
  changeQuantityDishes(type: 'resta' | 'suma') {
    if (type === 'resta') {
      this.quantityTotal -= 1;
    } else {
      this.quantityTotal += 1;
    }
    this.calcTotal();
  }

  calcTotal() {
    this.totalPrice = ((this.totalOptions + this.valueDish) * this.quantityTotal) + (this.totalAdditions) + (this.totalSideDish);
  }
  
  addCart() {
    this.mainForm.totalPrice = this.totalPrice;
    this.mainForm.quantityTotal = this.quantityTotal;
    this.mainForm.nameMenu = this.menu.name || '';
    this.mainForm.imagenMenu = this.menu.mainImage || this.menu.image;

    if (this.isThereORderInCart) {
      console.log('agregar a un pedido que ya esta')
      const finalForm = {
        dishes: {
          avaible: true,
          check: false,
          dateCreated: {
            nanoseconds: ((new Date()).getTime()) * 0.000001,
            seconds: ((new Date()).getTime()) * 0.001,
          },
          dishId: '',
          extras: {
            additions: this.mainForm.additions,
            customizations: this.mainForm.customizations,
            options: this.mainForm.options,
            sideDishes: this.mainForm.sideDish,
          },
          image: this.mainForm.imagenMenu || this.mainForm.images,
          name: this.mainForm.nameMenu,
          observation: 'null',
          price: this.mainForm.totalPrice,
          quantity: this.mainForm.quantityTotal,
          totalPrice: this.mainForm.totalPrice,
        }
      }
      this.shoppinCartService.getShoppingCartByIdUser(this.uidUser, this.modalMenuService.getIdBranch)
        .pipe(
          take(1)
        )
        .subscribe((dataResponse: any) => {
          console.log(dataResponse);
          dataResponse.dishes.push(finalForm.dishes);
          this.shoppinCartService.newDishesShoppingCart(this.uidUser, this.modalMenuService.getIdBranch, dataResponse)
            .then((result) => console.log(result))
            .catch((err) => console.log(err))
        })

    } else {
      this.brancheRestaurantService.getBrachesDetail(this.modalMenuService.getIdBranch).subscribe(data => {
        // console.log(data);
        this.databranche = data;
        const finalForm = {
          dishes: [
            {
              avaible: true,
              check: false,
              dateCreated: {
                nanoseconds: ((new Date()).getTime()) * 0.000001,
                seconds: ((new Date()).getTime()) * 0.001,
              },
              dishId: '',
              extras: {
                additions: this.mainForm.additions,
                customizations: this.mainForm.customizations,
                options: this.mainForm.options,
                sideDishes: this.mainForm.sideDish,
              },
              image: this.mainForm.imagenMenu || this.mainForm.images,
              name: this.mainForm.nameMenu,
              observation: 'null',
              price: this.mainForm.totalPrice,
              quantity: this.mainForm.quantityTotal,
              totalPrice: this.mainForm.totalPrice,
            }
          ],
          // restaurant: this.modalMenuService.getIdBranch
          restaurant: {
            address: this.databranche.address,
            coordinate: this.databranche.coordinates,
            state: this.databranche.state,
            res_Id: this.databranche.restaurantId,
            suc_Id: this.mainForm.idBranch,

          }
        }
        this.shoppinCartService.createShoppingCart(this.uidUser, this.modalMenuService.getIdBranch, finalForm)
          .then((result) => console.log(result))
          .catch((err) => console.log(err))
      })
    }
    // let dataInStorage: any[] = JSON.parse(localStorage.getItem(this.mainForm.idBranch)) || [];

    // if (dataInStorage.length !== 0) {
    //   dataInStorage.push(this.mainForm)
    //   localStorage.setItem(this.mainForm.idBranch, JSON.stringify(dataInStorage));
    // } else {
    //   dataInStorage.push(this.mainForm)
    //   localStorage.setItem(this.mainForm.idBranch, JSON.stringify(dataInStorage));
    // }
    this.cartService.changeCart(true);
    this.modalMenuService.changeStateModalMenu()
  }
}
