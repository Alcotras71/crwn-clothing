import { FC } from 'react'

import type { Category } from 'types/category'

import './category-item.styles.scss'

type Props = {
  category: Category
}

const CategoryItem: FC<Props> = ({ category }): JSX.Element => {
  const { imageUrl, title } = category

  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  )
}

export default CategoryItem
