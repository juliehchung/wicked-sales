import React from 'react';

function Header(props) {
  const viewCart = props.viewData;
  let cartItemCount = 0;
  for (let cartIndex = 0; cartIndex < props.cart.length; cartIndex++) {
    cartItemCount += props.cart[cartIndex].quantity;
  }
  const items = cartItemCount === 1 ? '1 Item' : `${cartItemCount} Items`;
  return (
    <div className="navbar navbar-dark bg-dark justify-content-between m-auto sticky-top">
      <h5 className="my-auto text-white" href="">
        <i className="fas fa-paw m-3"></i>
        BORKER
      </h5>
      <h6 className="my-auto mr-3 text-white" onClick={() => viewCart('cart', {})} href="#">
        {items}
        <i className="fas fa-shopping-cart m-2"></i>
      </h6>
    </div>
  );
}

export default Header;
