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
    <div className="container col-xl-10 mt-5">
      <div className="back text-muted m-4" onClick={() => changeView('catalog', {})}>
        {'< Back to catalog'}
      </div>
      <h2 className="container m-3">My Cart</h2>
      <div className="container d-flex flex-wrap">
        {cart.map(cartItem => <CartSummaryItem key={cartItem.cartItemId} cartData={cartItem} />)}
      </div>
      <div className="container row m-3 mb-5 d-flex justify-content-between">
        <h4 className="m-3">
          Total: {total}
        </h4>
        <button className="btn btn-primary m-2 mr-5" onClick={() => changeView('checkout', {})}>Checkout</button>
      </div>

    </div>
  );
}

export default CartSummary;
