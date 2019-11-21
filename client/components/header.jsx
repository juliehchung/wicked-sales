import React from 'react';

function Header(props) {
  const cartItemCount = props.cartItemCount;
  let items;
  if (cartItemCount === 1) {
    items = '1 Item';
  } else {
    items = `${cartItemCount} Items`;
  }
  return (
    <div className="navbar navbar-expand-sm navbar-expand-md navbar-expand-lg navbar-expand-xl navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        <div className="container">
          <i className="fas fa-dollar-sign m-3"></i>
          Wicked Sales
        </div>
      </a>
      <div className="collapse navbar-collapse mr-3">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              {items}
              <i className="fas fa-shopping-cart m-2"></i>
              <span className="sr-only">(current)</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
