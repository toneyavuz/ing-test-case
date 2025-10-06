import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'ing-employee-list-header',
  standalone: false,
  templateUrl: './employee-list-header.html',
  styleUrl: './employee-list-header.scss'
})
export class EmployeeListHeader {
  @Output() viewChange = new EventEmitter<'list' | 'card'>();

  @Input() view: 'list' | 'card' = 'list';

  setView(v: 'list' | 'card') {
    this.view = v;
    this.viewChange.emit(v);
  }
}
