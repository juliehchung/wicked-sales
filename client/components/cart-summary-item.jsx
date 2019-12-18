import React from 'react';

function CartSummaryItem(props) {
  const cartItemInfo = props.cartData;
  let price = cartItemInfo.price;
  price = '$' + ((price / 100).toFixed(2));
  return (
    <div className="card m-3 checkout-item">
      <div className="card-body">
        <div className="row">
          <img src={cartItemInfo.image} alt={cartItemInfo.name} className="cartItemImg col-m-2 ml-4" />
          <div className="container col-sm-5 d-flex flex-column align-self-center">
            <h5>{cartItemInfo.name}</h5>
            <h6 className="text-muted">{price}</h6>
            <p>{cartItemInfo.shortDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
