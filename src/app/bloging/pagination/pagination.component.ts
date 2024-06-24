import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() totalResults: number = 0;
  @Input() resultsPerPage: number = 3;
  @Input() currentPage: number = 1;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalResults / this.resultsPerPage);
  }

  get startResult(): number {
    return (this.currentPage - 1) * this.resultsPerPage + 1;
  }

  get endResult(): number {
    return Math.min(this.currentPage * this.resultsPerPage, this.totalResults);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
}
