import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login">
        <form>
          <input type="text" data-testid="login-name-input" />
          <button type="submit" data-testid="login-submit-button">Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
