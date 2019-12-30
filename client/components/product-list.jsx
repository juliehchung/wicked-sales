import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  getProducts() {
    const requestProds = new Request('/api/products');
    fetch(requestProds)
      .then(res => res.json())
      .then(products => this.setState({ products }))
      .catch(error => console.error('Fetch Failed:', error));
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const viewInfo = this.props.viewData;
    const prevProducts = this.state.products;
    return (
      <div>
        <div className="hero-image d-flex background-dark">
          <h3 className="d-flex align-items-center text-white">
            <i className="quote fas fa-quote-left ml-4"></i>
            <h3 className="hero-text col-8 col-md-6 col-xl-8">All you need is love and a dog.</h3>
          </h3>
        </div>
        <div className="container d-flex flex-wrap align-items-stretch mb-5">
          {prevProducts.map(product => <ProductListItem key={product.productId} productData={product} viewData={viewInfo} />)}
        </div>
      </div>
    );
  }
}

export default ProductList;
