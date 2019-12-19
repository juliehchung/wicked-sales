import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  const cart = props.cartItems;
  const changeView = props.viewData;
  let totalPrice = 0;
  cart.map(product => {
    totalPrice = totalPrice + product.price;
  });
  const total = '$' + ((totalPrice / 100).toFixed(2));
  return (
    <div className="container col-10 my-5">
      <div className="back text-muted my-3" onClick={() => changeView('catalog', {})}>
        {'< Back to Catalog'}
      </div>
      <h2>My Cart</h2>
      <div className="d-flex flex-wrap">
        {cart.map(cartItem => <CartSummaryItem key={cartItem.cartItemId} cartData={cartItem} />)}
      </div>
      <div className="container">
        <div className="row d-flex justify-content-between align-items-center my-3">
          <h4>Total: {total}</h4>
          <button className="btn btn-primary align-self-end" onClick={() => changeView('checkout', {})}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
