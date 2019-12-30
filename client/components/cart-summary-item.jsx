import React from 'react';

function CartSummaryItem(props) {
  const cartItemInfo = props.cartData;
  const productId = cartItemInfo.productId;
  const quantity = cartItemInfo.quantity;
  let price = cartItemInfo.price;
  price = '$' + ((price / 100).toFixed(2));
  let itemRemove;
  if (quantity === 1) {
    itemRemove = () => {
      props.removeProduct(cartItemInfo);
      props.toggleModal();
    };
  } else {
    itemRemove = () => props.update({ productId, operator: '-' });
  }
  return (
    <div className="bg-white border rounded col-12 py-2 my-3">
      <button type="button" className="close" aria-label="Close"
        onClick={() => {
          props.removeProduct(cartItemInfo);
          props.toggleModal();
        }}>
        <span aria-hidden="true">&times;</span>
      </button>
      <div className="row py-2">
        <img src={cartItemInfo.image} alt={cartItemInfo.name} className="cart-item img-fluid col-md-4" />
        <div className="col-md-8 d-flex flex-column align-self-center">
          <h5>{cartItemInfo.name}</h5>
          <h6 className="text-muted">{price}</h6>
          <p>{cartItemInfo.shortDescription}</p>
          <div className="row border rounded p-1 my-2 ml-0 mr-auto">
            <i className="click far fa-minus-square m-auto p-1" onClick={itemRemove}></i>
            <h6 className="m-auto p-1">{quantity}</h6>
            <i className="click far fa-plus-square m-auto p-1" onClick={() => props.update({ productId, operator: '+' })}></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
