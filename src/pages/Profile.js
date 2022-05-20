import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Header />
        </header>
        <div data-testid="page-profile" />
      </div>
    );
  }
}

export default Profile;
