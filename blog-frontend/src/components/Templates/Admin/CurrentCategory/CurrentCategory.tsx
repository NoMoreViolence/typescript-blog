import * as React from 'react'
import './CurrentCategory.css'
import { CategoryStateInside } from 'store/modules/Category'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'

interface Props {
  category: CategoryStateInside[]
}

const CurrentCategory = (Props: Props) => {
  // Show category
  const loadCategory = (data: CategoryStateInside[]) => {
    return data.map((object, i) => {
      return <BreadcrumbItem key={i}>{object.category}</BreadcrumbItem>
    })
  }

  return (
    <div className="current-category">
      <p>현재 카테고리</p>
      <Breadcrumb>
        <BreadcrumbItem />
        {loadCategory(Props.category)}
      </Breadcrumb>
    </div>
  )
}

export default CurrentCategory
