import { Component } from '@angular/core';
import { ModalMenuService } from './core/services/modal/modal-menu.service';
import { ModalService } from './core/services/modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public modalService: ModalService,
    public modalMenuService: ModalMenuService
  ) { }

  title = 'chill-user';
}
