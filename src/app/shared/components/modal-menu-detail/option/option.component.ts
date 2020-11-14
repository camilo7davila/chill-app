import { Component, Input, OnInit } from '@angular/core';
import { Option } from 'src/app/core/interfaces/restaurant.interface';

@Component({
  selector: 'app-option-component',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
  @Input() options: Option[] 

  constructor() { }

  ngOnInit(): void {
  }

}
