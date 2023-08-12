import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Stats } from '../../types/stats';
import { ProductsService } from '../../services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-stats',
  templateUrl: './products-stats.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsStatsComponent {
  $stats: Observable<Stats[]> = this.service.$stats;

  constructor(private service: ProductsService) {}
}
