import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  onLoadCategory: Function;
}

class HeaderLogo extends React.Component<Props> {
  public handleLoadCategory = () => {
    this.props.onLoadCategory();
  };
  public render() {
    return (
      <h1>
        <NavLink to="/" onClick={this.handleLoadCategory}>
          IHP Blog
        </NavLink>
      </h1>
    );
  }
}

export default HeaderLogo;
