import React from 'react';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Header />
        </header>
        <div data-testid="page-profile-edit" />
      </div>
    );
  }
}

export default ProfileEdit;
