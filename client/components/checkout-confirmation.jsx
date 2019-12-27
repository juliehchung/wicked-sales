import React from 'react';

function CheckoutConfirmation(props) {
  let totalPrice = 0;
  props.purchased.forEach(product => {
    totalPrice = totalPrice + (product.price * product.quantity);
  });
  const total = '$' + ((totalPrice / 100).toFixed(2));
  const confirmationList = props.purchased.map(product => {
    return (
      <div className="bg-white border rounded col-12 py-2 my-3" key={product.productId}>
        <div className="row py-2">
          <img src={product.image} alt={product.name} className="cart-item img-fluid col-md-4" />
          <div className="col-md-8 d-flex flex-column align-self-center">
            <h5>{product.name}</h5>
            <h6 className="text-muted">{product.price}</h6>
            <p>Quantity: {product.quantity}</p>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div>
      <h1>Your order has been placed!</h1>
      <h2>Order Total: {total}</h2>
      <div className="container">
        {confirmationList}
      </div>
      <div className="container">
        <div className="row d-flex justify-content-between align-items-center my-3">
          <div className="back text-muted" onClick={() => props.viewData('catalog', {})}>
            {'< Continue Shopping'}
          </div>
        </div>
      </div>
    </div>
  );

}

export default CheckoutConfirmation;
