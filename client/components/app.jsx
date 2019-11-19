import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: { name: 'catalog', params: {} } };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: { name, params }
    });
  }

  render() {
    let productElem;
    if (this.state.view.name === 'catalog') {
      productElem = <ProductList viewData={this.setView} />;
    } else if (this.state.view.name === 'details') {
      productElem = <ProductDetails productData={this.state.view.params} viewData={this.setView} />;
    }
    return (
      <>
        <Header />
        <div className="container">
          {productElem}
        </div>
      </>
    );
  }
}
