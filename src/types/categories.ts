export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export interface CategoriesMap {
  hats: Product[];
  jackets: Product[];
  mens: Product[];
  sneakers: Product[];
  womens: Product[];
}

export interface CategoryInterface {
  imageUrl: string;
  items: Product[];
  title: string;
}
