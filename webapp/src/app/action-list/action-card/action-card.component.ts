import { Component, OnInit, Input } from '@angular/core';
import { Action } from '@types';

@Component({
  selector: 'app-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss']
})
export class ActionCardComponent implements OnInit {

  @Input() action: Action;

  constructor() { }

  ngOnInit() {
  }

}
