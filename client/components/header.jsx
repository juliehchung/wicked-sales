import React from 'react';

function Header(props) {
  const viewCart = props.viewData;
  let cartItemCount = 0;
  for (let cartIndex = 0; cartIndex < props.cart.length; cartIndex++) {
    cartItemCount += props.cart[cartIndex].quantity;
  }
  const items = cartItemCount === 1 ? '1 Item' : `${cartItemCount} Items`;
  return (
    <div className="navbar navbar-expand-sm navbar-dark bg-dark justify-content-between">
      <a className="navbar-brand" href="">
        <i className="fas fa-dollar-sign m-3"></i>
        BORKER
      </a>
      <a className="mr-3 text-white" onClick={() => viewCart('cart', {})} href="#">
        {items}
        <i className="fas fa-shopping-cart m-2"></i>
      </a>
    </div>
  );
}

export default Header;
