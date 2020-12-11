import { Component, OnInit } from '@angular/core';

import { OrdenRequestService } from 'src/app/core/services/orden-request/orden-request.service';

import { OrderRequest } from 'src/app/core/interfaces/orden-request.interface';


@Component({
  selector: 'app-orden-request',
  templateUrl: './orden-request.component.html',
  styleUrls: ['./orden-request.component.scss']
})
export class OrdenRequestComponent implements OnInit {
  public ordenrequest: OrderRequest[] = [];

  constructor(
    private ordenRequestService: OrdenRequestService,
  ) { }

  ngOnInit(): void {
    this.ordenRequestService.getAllOrderRequest()
      .subscribe(data => {
        console.log('ordennnnn', data);
      })
  }

}
