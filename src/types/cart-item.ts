import { Product } from 'types/categories';

export interface CartItemType extends Product {
  quantity: number;
}
