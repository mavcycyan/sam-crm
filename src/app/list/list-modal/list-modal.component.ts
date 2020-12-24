import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list-modal',
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.sass']
})
export class ListModalComponent implements OnInit {

  @Output() close = new EventEmitter<void>()

  constructor() { }

  ngOnInit() {
  }

}
