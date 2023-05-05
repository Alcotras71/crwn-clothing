import { FC } from 'react';

import type { Category } from 'types/category';

import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from 'components/directory-item/directory-item.styles';

type Props = {
  category: Category;
};

const DirectoryItem: FC<Props> = ({ category }): JSX.Element => {
  const { imageUrl, title } = category;

  return (
    <DirectoryItemContainer>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
