import React from 'react';
/* import PropTypes from 'prop-types'; */
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  state = {
    nameUser: {},
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const myUser = await getUser();
    this.setState({
      isLoading: false,
      nameUser: myUser,
    });
  }

  render() {
    const {
      isLoading,
      nameUser,
    } = this.state;
    return (
      <div>
        <header data-testid="header-component">
          { isLoading ? (
            <Loading />
          ) : (
            <p data-testid="header-user-name">
              { nameUser.name }
            </p>
          )}
        </header>
      </div>
    );
  }
}

export default Header;
