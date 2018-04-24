import * as React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { CategoryStateInside } from 'store/modules/Category';
interface Props {
  Category: [CategoryStateInside];
}
class HeaderCategory extends React.Component<Props> {
  public render() {
    // const hello = (object: [CategoryStateInside]) => {
    //  return object.map((object, i) => {
    //    return <div key={i}>{object.category}</div>;
    //  });
    // };
    return (
      <Breadcrumb>
        <BreadcrumbItem />
      </Breadcrumb>
    );
  }
}

export default HeaderCategory;
