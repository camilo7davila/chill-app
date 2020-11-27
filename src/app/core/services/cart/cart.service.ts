import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  

  private cart = new BehaviorSubject<boolean>(true);

  public cart$ = this.cart.asObservable();

  constructor() { }

  changeCart(isChange: boolean) {
    this.cart.next(isChange)
  }

}
