import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    nameUser: '',
    isLoginButtonDisabled: true,
    isLoading: false,
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }), this.validaButton);
  };

  validaButton = () => {
    const {
      nameUser,
    } = this.state;

    /* if (nameUser.length >= '3') {
      this.setState(() => ({ isLoginButtonDisabled: false }));
    } else {
      this.setState(() => ({ isLoginButtonDisabled: true }));
    } */
    this.setState({ isLoginButtonDisabled: nameUser.length < '3' });
  };

  createUserButton = async () => {
    this.setState({
      isLoading: true,
    });
    const { nameUser } = this.state;
    await createUser({ name: nameUser });
    const { history } = this.props;
    history.push('/search');
  };

  render() {
    const {
      nameUser,
      /* onInputChange, */
      isLoginButtonDisabled,
      isLoading,
    } = this.state;

    /*     this.props = {
      nameUser,
      onInputChange,
      createUserButton,
      isLoginButtonDisabled,
    }; */

    return (
      <div>
        { isLoading ? (
          <Loading />
        ) : (
          <div data-testid="page-login">
            <form>
              <input
                name="nameUser"
                type="text"
                data-testid="login-name-input"
                value={ nameUser }
                onChange={ this.onInputChange }
              />
              <button
                name="submitButton"
                type="submit"
                data-testid="login-submit-button"
                disabled={ isLoginButtonDisabled }
                onClick={ this.createUserButton }
              >
                Entrar
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

/* Login.defaultProps = {
  nameUser: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  isLoginButtonDisabled: PropTypes.bool.isRequired,
}; */

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Login;
