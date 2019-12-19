import React from 'react';

function CartSummaryItem(props) {
  const cartItemInfo = props.cartData;
  let price = cartItemInfo.price;
  price = '$' + ((price / 100).toFixed(2));
  return (
    <div className="bg-white border rounded col-12 py-2 my-3">
      <div className="row py-2">
        <img src={cartItemInfo.image} alt={cartItemInfo.name} className="cart-item img-fluid col-md-6" />
        <div className="col-md-4 d-flex flex-column align-self-center">
          <h5>{cartItemInfo.name}</h5>
          <h6 className="text-muted">{price}</h6>
          <p>{cartItemInfo.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
