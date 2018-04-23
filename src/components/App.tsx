import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import { Container } from 'reactstrap';
import HeaderContainer from 'containers/HeaderContainer';

class App extends React.Component {
  public render() {
    return (
      <Container>
        <ToastContainer />
        <HeaderContainer />
      </Container>
    );
  }
}

export default App;
