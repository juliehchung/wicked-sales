import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
  }

  componentDidMount() {
    const prodId = this.props.productData.productId;
    const prodReq = new Request(`/api/products?productId=${prodId}`);
    fetch(prodReq)
      .then(response => response.json())
      .then(product => this.setState({ product }))
      .catch(error => console.error('Fetch Failed:', error));
  }

  render() {
    const addToCart = this.props.addItem;
    const productInfo = this.state.product;
    if (!productInfo) {
      return null;
    }
    let price = productInfo.price;
    price = '$' + ((price / 100).toFixed(2));
    return (
      <div className="container col-10 my-5">
        <div className="">
          <div className="text-muted m-3" onClick={() => this.props.viewData('catalog', {})}>
            {'< Back to Catalog'}
          </div>
          <div className="">
            <div className="col-md-4">
              <img src={productInfo.image} alt={productInfo.name} className="detailsImg img-fluid rounded" />
            </div>
            <div className="col-md-8">
              <h5>{productInfo.name}</h5>
              <h6 className="text-muted">{price}</h6>
              <p>{productInfo.shortDescription}</p>
              <button className="btn btn-primary" onClick={() => addToCart(productInfo)}>Add to Cart</button>
            </div>
          </div>
          <div className="container">
            {productInfo.longDescription}
          </div>
        </div>
      </div>
    );
  }

}

export default ProductDetails;
