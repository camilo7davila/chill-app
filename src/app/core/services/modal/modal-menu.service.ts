import { Injectable } from '@angular/core';
import { BranchesM } from '../../interfaces/restaurant.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalMenuService {
  public showModalMenu: boolean = false;

  private menu: BranchesM;
  private idBranch: string;

  get getIdMenuSelected(): BranchesM { return this.menu }
  get getIdBranch(): string { return this.idBranch }

  constructor() { }

  public changeStateModalMenu(idBranch: string, menu?: BranchesM): void {
    if (!this.showModalMenu) {
      this.idBranch = idBranch
      this.menu = menu
    }
    this.showModalMenu = !this.showModalMenu;
  }

}
