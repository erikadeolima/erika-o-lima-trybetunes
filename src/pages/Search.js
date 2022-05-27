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

  // A func searchArtist é responsavel por consultar minha API, e me retornar todas as keys que contenham o valor da minha busca. O preventDefault evita que minha pag sofra um refresh antes da minha requisição ser finalizada. O retorno da minha requisição a searchAlbumsAPI me retorna os dados que irei usar para construir minha pag com os resultados da busca

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
          {/* Se minha pagina estiver carregando, ou seja ainda estiver requisitando a API, exibo a pag carregando, senão exibo o resultados dos albuns para o artista, se n for encontrado nenhum album, exibo um testo, senao exibo a lista desses albuns, que são construidos com um map */}
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
              <img alt="Album" src={ album.artworkUrl100 } />
            </div>
          )))}
        </form>
      </div>
    );
  }
}

export default Search;
