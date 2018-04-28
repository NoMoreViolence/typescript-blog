import * as React from 'react'
import { CategoryStateInside } from 'store/modules/Category'
interface Props {
  Category: [CategoryStateInside]
  loginLogined: boolean
}

class CategoryAdd extends React.Component<Props> {
  public render() {
    return <div />
  }
}

export default CategoryAdd
