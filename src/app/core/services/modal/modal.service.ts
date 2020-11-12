import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {

  public showModal: boolean = false;
  private idRestaurant: string;

  get getIdRestaurantSelected(): string { return this.idRestaurant }

  constructor() { }

  public changeStateModal(idRestaurant?: string): void {
    if (!this.showModal) {
      this.idRestaurant = idRestaurant
    }
    this.showModal = !this.showModal
  }

  // public changeStateModalMenu(idRestaurant?: string): void {
  //   if (!this.showModal) {
  //     this.idRestaurant = idRestaurant
  //   }
  //   this.showModal = !this.showModal
  // }



}
