import React from 'react';
import { Link } from 'react-router-dom';
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
              Olá,
              { nameUser.name }
            </p>
          )}
          <nav>
            <Link data-testid="link-to-search" to="/search">SEARCH</Link>
            <br />
            <Link data-testid="link-to-favorites" to="/favorites">FAVORITES</Link>
            <br />
            <Link data-testid="link-to-profile" to="/profile">PROFILE</Link>
            <br />
          </nav>
        </header>
      </div>
    );
  }
}

export default Header;
