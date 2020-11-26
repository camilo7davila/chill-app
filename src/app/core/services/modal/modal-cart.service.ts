import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalCartService {

  public showModal: boolean = false;

  constructor() { }

  public changeStateModal(): void {
    if (!this.showModal) {
  
    }
    this.showModal = !this.showModal
  }
}
