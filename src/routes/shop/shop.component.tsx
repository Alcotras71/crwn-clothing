import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CategoriesPreview from 'components/categories-preview/categories-preview.component';
import Category from 'routes/category/category.component';
import { getCategoriesAndDocuments } from 'utils/firebase/firebase.utils';
import { setCategories } from 'store/categories/categories.action';

import type { CategoryInterface } from 'types/categories';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      const categoriesArray =
        (await getCategoriesAndDocuments()) as CategoryInterface[];
      dispatch(setCategories(categoriesArray));
    };

    getCategories();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
