import { FC } from 'react';

import type { Category } from 'types/category';

import './directory-item.styles.scss';

type Props = {
  category: Category;
};

const DirectoryItem: FC<Props> = ({ category }): JSX.Element => {
  const { imageUrl, title } = category;

  return (
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
