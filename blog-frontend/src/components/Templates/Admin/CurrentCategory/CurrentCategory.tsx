import * as React from 'react'
import './CurrentCategory.css'
import { CategoryStateInside } from 'store/modules/Category'

interface Props {
  category: CategoryStateInside[]
}

const CurrentCategory: React.SFC<Props> = (Props): JSX.Element => {
  // Show categor
  const loadCategory = (data: CategoryStateInside[]): JSX.Element[] => {
    return data.map(
      (object: CategoryStateInside, i: number): JSX.Element => {
        return (
          <div key={i} className="current-category-unit">
            {object.category}
          </div>
        )
      }
    )
  }

  return (
    <div className="current-category">
      <h3>현재 카테고리</h3>
      <div className="currnet-category-unit-container">{loadCategory(Props.category)}</div>
    </div>
  )
}

export default CurrentCategory
