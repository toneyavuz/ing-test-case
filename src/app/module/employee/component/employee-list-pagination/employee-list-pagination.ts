import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'ing-employee-list-pagination',
  standalone: false,
  templateUrl: './employee-list-pagination.html',
  styleUrl: './employee-list-pagination.scss'
})
export class EmployeeListPagination {
  @Input() length = 0;
  @Input() pageSize = 10;
  @Input() pageIndex = 0;
  @Input() pageSizeOptions = [5, 10, 25, 50];

  @Output() page = new EventEmitter<PageEvent>();

}
