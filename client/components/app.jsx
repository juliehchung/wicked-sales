import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: { type: 'catalog', params: {} }, cart: [] };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  setView(type, params) {
    this.setState({
      view: { type, params }
    });
  }

  getCartItems() {
    const requestItems = new Request('/api/cart');
    fetch(requestItems)
      .then(res => res.json())
      .then(cart => this.setState({ cart }))
      .catch(error => console.error('Fetch Failed:', error));
  }

  addToCart(product) {
    const requestCart = new Request('/api/cart');
    const req = {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(requestCart, req)
      .then(response => response.json())
      .then(product => this.setState({ cart: this.state.cart.concat(product) }))
      .catch(error => console.error('Fetch Failed:', error));
  }

  componentDidMount() {
    this.getCartItems();
  }

  placeOrder({ name, creditCard, shippingAddress }) {
    const requestOrder = new Request('/api/orders');
    const request = {
      method: 'POST',
      body: JSON.stringify({ name, creditCard, shippingAddress }),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(requestOrder, request)
      .then(response => response.json())
      .then(order => this.setState({ view: { type: 'catalog', params: {} }, cart: [] }))
      .catch(error => console.error('Fetch Failed:', error));
  }

  render() {
    let productElem;
    const viewType = this.state.view.type;
    if (viewType === 'catalog') {
      productElem = <ProductList viewData={this.setView} />;
    } else if (viewType === 'details') {
      productElem = <ProductDetails productData={this.state.view.params} viewData={this.setView} addItem={this.addToCart} />;
    } else if (viewType === 'cart') {
      productElem = <CartSummary cartItems={this.state.cart} viewData={this.setView}/>;
    } else if (viewType === 'checkout') {
      productElem = <CheckoutForm checkout={this.placeOrder} viewData={this.setView} priceInfo={this.state.cart}/>;
    }
    const cartItemCount = this.state.cart.length;
    return (
      <>
        <Header cartItemCount={cartItemCount} viewData={this.setView}/>
        <div className="container">
          {productElem}
        </div>
      </>
    );
  }
}
