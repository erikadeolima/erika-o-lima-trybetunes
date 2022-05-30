import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
/* import Loading from '../pages/Loading'; */

class MusicCard extends React.Component {
  state = {
    isLoading: false,
    favorited: false,
  }

  componentDidMount() {
    const { isFavorite } = this.props;
    this.setState({
      favorited: isFavorite,
    });
  }

  favoriteSong = (/* { target } */) => {
    const { trackName, src, trackId, image } = this.props;
    const track = { trackName, src, trackId, image };
    const { favorited } = this.state;
    if (!favorited) {
      this.setState({ isLoading: true, favorited: true }, async () => {
        await addSong(track);
        this.setState({ isLoading: false });
      });
    } else {
      this.setState({ isLoading: true, favorited: false }, async () => {
        await removeSong({ trackId });
        this.setState({ isLoading: false });
      });
      window.location.reload();
    }
  }

  render() {
    const { trackName, src, trackId, image, buttonTitle } = this.props;
    const { isLoading, favorited } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <img src={ image } alt={ trackName } />
        <audio data-testid="audio-component" src={ src } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor="favorites">
          {buttonTitle}
          <input
            type="checkbox"
            id="favorites"
            defaultChecked={ favorited }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.favoriteSong }
          />
          {isLoading && <p>Carregando...</p>}
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  buttonTitle: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;
