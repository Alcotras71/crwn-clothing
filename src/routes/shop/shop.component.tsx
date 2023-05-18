import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import CategoriesPreview from 'components/categories-preview/categories-preview.component';
import Category from 'routes/category/category.component';

import { fetchCategoriesStart } from 'store/categories/categories.action';
import { useAppDispatch } from 'utils/store/app-dispatch';

const Shop = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
