import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

import { getCategoriesAndDocuments } from 'utils/firebase/firebase.utils';

import { CategoriesMap } from 'types/categories';

type CategoriesContextType = {
  categoriesMap: CategoriesMap | object;
};

export const CategoriesContext = createContext<CategoriesContextType>({
  categoriesMap: {},
});

export const CategoriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState<CategoriesMap | object>(
    {}
  );
  const value = { categoriesMap };

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
