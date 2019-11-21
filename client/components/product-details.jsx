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
      <div className="container col-xl-9 mt-5">
        <div className="card">
          <div className="back text-muted m-3" onClick={() => this.props.viewData('catalog', {})}>
            {'< Back to catalog'}
          </div>
          <div className="card-body">
            <div className="row">
              <img src={productInfo.image} alt={productInfo.name} className="detailsImg col-m-2 ml-4" />
              <div className="container col-sm-5">
                <h5 className="">{productInfo.name}</h5>
                <h6 className="text-muted">{price}</h6>
                <p className="">{productInfo.shortDescription}</p>
                <button className="btn btn-primary" onClick={() => addToCart(productInfo)}>Add to Cart</button>
              </div>
            </div>
            <div className="container mt-4">
              {productInfo.longDescription}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default ProductDetails;
