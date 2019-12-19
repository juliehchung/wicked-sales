import React from 'react';

function CartSummaryItem(props) {
  const cartItemInfo = props.cartData;
  let price = cartItemInfo.price;
  price = '$' + ((price / 100).toFixed(2));
  return (
    <div className="bg-white border rounded py-3 col-12 m-3">
      <div className="row m-3">
        <img src={cartItemInfo.image} alt={cartItemInfo.name} className="img-fluid col-md-4 mb-3" />
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
