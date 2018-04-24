import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppContainer from 'containers/AppContainer';

class MainComponent extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    );
  }
}

export default MainComponent;
