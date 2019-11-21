import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  const cart = props.cartItems;
  const viewCatalog = props.viewData;
  let totalPrice = 0;
  cart.map(product => {
    totalPrice = totalPrice + product.price;
  });
  const total = '$' + ((totalPrice / 100).toFixed(2));
  return (
    <div className="container col-xl-10 mt-5">
      <div className="back text-muted m-4" onClick={() => viewCatalog('catalog', {})}>
        {'< Back to catalog'}
      </div>
      <h2 className="container m-3">My Cart</h2>
      <div className="container d-flex flex-wrap">
        {cart.map(cartItem => <CartSummaryItem key={cartItem.cartItemId} cartData={cartItem} />)}
      </div>
      <h4 className="container m-3">
        Total: {total}
      </h4>
    </div>
  );
}

export default CartSummary;
