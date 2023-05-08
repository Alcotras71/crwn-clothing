import { FC } from 'react';

import type { Category } from 'types/category';

import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from 'components/directory-item/directory-item.styles';
import { useNavigate } from 'react-router-dom';

type Props = {
  category: Category;
};

const DirectoryItem: FC<Props> = ({ category }): JSX.Element => {
  const { imageUrl, title, route } = category;

  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
