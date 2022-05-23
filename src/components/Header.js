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
    // Função responsável por fazer a montagem do meu DOM, ela carrega após minha pagina ter sido montada, assim minha func getUser foi usada aqui para que o carregamento da  inha pag n fosse interferido pelo retorno dela, como ela é uma requisição a API, ela é assincrona, o que acaba retardando meu carregamento
    this.setState({
      isLoading: true,
    });
    /* Utilize a função getUser da userAPI para recuperar o nome da pessoa logada e exiba essa informação na tela. */
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
        {/* Crie esse componente com a tag header envolvendo todo seu conteúdo e com o atributo data-testid="header-component"; */}
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
            {/* tag nav para estruturar um menu de navegação a tag LINK proporciona o redirecionamento para um local/ obj para isso utilizo a propiedade to, que irá guardar o caminho de redirecionamento desse link */}
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
