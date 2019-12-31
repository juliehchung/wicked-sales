import React from 'react';

function RemoveItemModal(props) {
  return (
    <div className="backdrop position-fixed d-flex h-100 w-100">
      <div className="modal-contents m-auto bg-white border rounded mt-5 p-3">
        <div className="col-md-12">
          <img src={props.removeProduct.image} alt={props.removeProduct.name} className="img-fluid rounded" />
        </div>
        <p className="m-2">Are you sure you want to remove this item from your cart?</p>
        <div className="btn-group w-100 p-1">
          <button className="btn btn-secondary w-50" onClick={() => props.toggleModal()}>Cancel</button>
          <button className="btn btn-danger w-50" onClick={() => {
            props.remove({ productId: props.removeProduct.productId, cartItemId: props.removeProduct.cartItemId });
            props.toggleModal();
          }}>Remove</button>
        </div>
      </div>
    </div>
  );
}

export default RemoveItemModal;
