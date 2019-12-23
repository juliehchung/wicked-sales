import React from 'react';

function CartSummaryItem(props) {
  const cartItemInfo = props.cartData;
  const productId = cartItemInfo.productId;
  const cartItemId = cartItemInfo.cartItemId;
  const quantity = cartItemInfo.quantity;
  let price = cartItemInfo.price;
  price = '$' + ((price / 100).toFixed(2));
  let itemRemove;
  if (quantity === 1) {
    itemRemove = () => props.remove({ productId, cartItemId });
  } else {
    itemRemove = () => props.update({ productId, operator: '-' });
  }
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
          <div className="d-flex flex-row align-items-center">
            <i className="sub far fa-minus-square" onClick={itemRemove}></i>
            <div>{quantity}</div>
            <i className="add far fa-plus-square" onClick={() => props.update({ productId, operator: '+' })}></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
