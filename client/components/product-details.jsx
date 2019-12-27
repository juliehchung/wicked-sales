import React from 'react';
import AddToCartModal from './add-to-cart-modal';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      showModal: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.getProductDetails();
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  getProductDetails() {
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
    const modal = this.state.showModal ? <AddToCartModal setView={this.props.viewData} product={productInfo}/> : null;
    return (
      <div className="container col-10 my-5">
        <div className="container col-10">
          {modal}
        </div>
        <div className="bg-white border rounded py-3">
          <div className="back text-muted ml-3" onClick={() => this.props.viewData('catalog', {})}>
            {'< Back to Catalog'}
          </div>
          <div className="row m-4">
            <div className="col-md-4">
              <img src={productInfo.image} alt={productInfo.name} className="img-fluid rounded" />
            </div>
            <div className="col-md-8 d-flex flex-column justify-content-end">
              <h5>{productInfo.name}</h5>
              <h6 className="text-muted">{price}</h6>
              <p>{productInfo.shortDescription}</p>
              <button className="btn btn-primary align-self-start" onClick={() => {
                addToCart({ productId: productInfo.productId, operator: '+' });
                this.toggleModal();
              }}>Add to Cart</button>
            </div>
          </div>
          <div className="row m-4">
            <div className="col-12">
              {productInfo.longDescription}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default ProductDetails;
