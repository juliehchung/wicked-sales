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
    const prevProducts = Array.from(this.state.products);
    return (
      <div className="container d-flex flex-wrap justify-content-between">
        {prevProducts.map(product => <ProductListItem key={product.productId} productData={product} viewData={viewInfo} />)}
      </div>
    );
  }
}

export default ProductList;
