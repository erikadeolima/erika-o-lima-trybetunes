import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    artistName: '',
    isLoginButtonDisabled: true,
    isLoading: false,
    albumsList: [],
    artist: '',
  };

  /*   async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const { artistName } = this.state;
    const artist = await searchAlbumsAPI(artistName);
    this.setState({
      isLoading: false,
      artistName: artist,
    });
    console.log(artistName);
  } */

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

  searchArtist = async (event) => {
    const { artistName } = this.state;
    event.preventDefault();
    this.setState({
      isLoading: true,
    });
    const albuns = await searchAlbumsAPI(artistName);
    this.setState({
      isLoading: false,
      albumsList: albuns,
      artist: artistName,
      artistName: '',
    });
  };

  render() {
    const {
      artistName,
      isLoginButtonDisabled,
      isLoading,
      albumsList,
      artist,
    } = this.state;
    return (
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
            onClick={ this.searchArtist }
          >
            Pesquisar
          </button>
          { isLoading ? (
            <Loading />
          ) : (
            <h1>
              Resultado de álbuns de:
              {' '}
              {artist}
            </h1>
          )}
          {albumsList.length === 0 ? (
            <h2>Nenhum álbum foi encontrado</h2>
          ) : (albumsList.map((album, index) => (
            <div key={ index }>
              <h2>{album.collectionName}</h2>
              <h2>{album.artistName}</h2>
              <nav>
                <Link
                  key={ album.collectionId }
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `/album/${album.collectionId}` }
                >
                  Ir para o Album
                </Link>
              </nav>
              <img alt="Album" src={ `url-to-${album.artworkUrl100}` } />
            </div>
          )))}
        </form>
      </div>
    );
  }
}

export default Search;
