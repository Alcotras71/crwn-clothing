import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CategoriesPreview from 'components/categories-preview/categories-preview.component';
import Category from 'routes/category/category.component';
import { getCategoriesAndDocuments } from 'utils/firebase/firebase.utils';
import { setCategoriesMap } from 'store/categories/categories.action';

import type { CategoriesMap } from 'types/categories';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap =
        (await getCategoriesAndDocuments()) as unknown as CategoriesMap;
      dispatch(setCategoriesMap(categoryMap));
    };

    getCategoriesMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
