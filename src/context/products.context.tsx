import { createContext, FC, PropsWithChildren, useState } from 'react';

import PRODUCTS from 'shop-data.json';

import type { Product } from 'types/product';

type ProductContextType = {
  products: Product[];
};

export const ProductsContext = createContext<ProductContextType>({
  products: [],
});

export const ProductsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
