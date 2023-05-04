import { Product } from 'types/product';

export interface CartItemType extends Product {
  quantity: number;
}
