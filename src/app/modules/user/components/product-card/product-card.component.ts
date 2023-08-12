import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from 'src/app/shared/types/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input('product') product: Product;

  isReadMore: boolean;
}
