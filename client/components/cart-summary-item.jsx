import React from 'react';

function CartSummaryItem(props) {
  const cartItemInfo = props.cartData;
  const productId = cartItemInfo.productId;
  const cartItemId = cartItemInfo.cartItemId;
  let price = cartItemInfo.price;
  price = '$' + ((price / 100).toFixed(2));
  return (
    <div className="bg-white border rounded col-12 py-2 my-3">
      <button type="button" className="close" aria-label="Close"
        onClick={() => props.remove({ productId, cartItemId })}>
        <span aria-hidden="true">&times;</span>
      </button>
      <div className="row py-2">
        <img src={cartItemInfo.image} alt={cartItemInfo.name} className="cart-item img-fluid col-md-4" />
        <div className="col-md-8 d-flex flex-column align-self-center">
          <h5>{cartItemInfo.name}</h5>
          <h6 className="text-muted">{price}</h6>
          <p>{cartItemInfo.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
