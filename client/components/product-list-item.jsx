import React from 'react';

function ProductListItem(props) {
  const product = props.productData;
  const price = product.price;
  return (
    <div className="col-xl-4 mt-4">
      <div className="product card m-3">
        <img src={product.image} className="card-img-top" alt={product.name}></img>
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{price}</h6>
          <p className="card-text">{product.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductListItem;
