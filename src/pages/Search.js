import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artistName: '',
    isLoginButtonDisabled: true,
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }), this.validaButton);
  };

  validaButton = () => {
    const {
      artistName,
    } = this.state;
    this.setState({ isLoginButtonDisabled: artistName.length < '2' });
  };

  render() {
    const {
      artistName,
      isLoginButtonDisabled,
    } = this.state;
    return (
      <div>
        <div data-testid="page-search" type="text">
          <header>
            <Header />
          </header>
          <form>
            <input
              name="artistName"
              type="text"
              data-testid="search-artist-input"
              value={ artistName }
              onChange={ this.onInputChange }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ isLoginButtonDisabled }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
