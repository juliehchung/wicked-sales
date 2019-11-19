import React from 'react';

function Header(props) {
  return (
    <h1 className=".navbar navbar-expand-xl navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        <div className="container">
          <i className="fas fa-dollar-sign m-3"></i>
          Wicked Sales
        </div>
      </a>
    </h1>
  );
}

export default Header;
