import { FC } from 'react'

import CategoryItem from 'components/category-item/category-item.component'

import type { Category } from 'types/category'

import './directory.styles.scss'

type Props = {
  categories: Readonly<Category[]>
}

const Directory: FC<Props> = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map(category => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}

export default Directory
