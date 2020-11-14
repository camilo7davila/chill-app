import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {

  public showModal: boolean = false;
  private idRestaurant: string;

  public showModalMenu: boolean = false;


  get getIdRestaurantSelected(): string { return this.idRestaurant }

  constructor() { }

  public changeStateModal(idRestaurant?: string): void {
    if (!this.showModal) {
      this.idRestaurant = idRestaurant
    }
    this.showModal = !this.showModal
  }

  }
