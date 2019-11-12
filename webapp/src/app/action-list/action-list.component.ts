import { ActionListService } from './action-list.service';
import { Action } from '@types';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.scss']
})
export class ActionListComponent implements OnInit {

  actions: Action[] = [];

  constructor(private actionsService: ActionListService) { }

  ngOnInit() {
    this.actionsService.getAllActions().subscribe(as => this.actions = as);
  }

}
