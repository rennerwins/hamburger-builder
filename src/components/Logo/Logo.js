import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '8px',
    height: '80%',
    boxSizing: 'border-box',
    borderRadius: '5px'
  },
  logo: {
    height: '100%'
  }
};

const logo = props => (
  <div style={styles.container}>
    <img style={styles.logo} src={burgerLogo} alt="MyBurger" />
  </div>
);

export default logo;
