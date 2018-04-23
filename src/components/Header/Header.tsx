import * as React from 'react';
import { CategoryStateInside } from 'store/modules/Category';
import HeaderMessageToAdmin from 'containers/HeaderMessageToAdmin';

interface Props {
  onLoadCategory: Function;
  categoryError: boolean;
  categoryCategory: [CategoryStateInside];
  categoryPending: boolean;
}

class Header extends React.Component<Props, {}> {
  public componentDidMount() {
    this.props.onLoadCategory();
  }

  public render() {
    const hello = (object: [CategoryStateInside]) => {
      return object.map((object, i) => {
        return <div key={i}>{object.category}</div>;
      });
    };
    return (
      <div>
        {hello(this.props.categoryCategory)}
        <HeaderMessageToAdmin />
      </div>
    );
  }
}

export default Header;
