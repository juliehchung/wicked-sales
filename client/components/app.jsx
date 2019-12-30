import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import LiveDemoModal from './live-demo-modal';
import CheckoutConfirmation from './checkout-confirmation';
import Footer from './footer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: { type: 'catalog', params: {} },
      cart: [],
      showModal: false,
      confirmedProducts: []
    };
    this.closeModal = this.closeModal.bind(this);
    this.setView = this.setView.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.confirmPurchase = this.confirmPurchase.bind(this);
  }

  setView(type, params) {
    this.setState({
      view: { type, params }
    });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  getCartItems() {
    const requestItems = new Request('/api/cart');
    fetch(requestItems)
      .then(res => res.json())
      .then(cart => this.setState({ cart }))
      .catch(error => console.error('Fetch Failed:', error));
  }

  updateCart({ productId, operator }) {
    const requestCart = new Request('/api/cart');
    const req = {
      method: 'POST',
      body: JSON.stringify({ productId, operator }),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(requestCart, req)
      .then(response => response.json())
      .then(data => this.getCartItems())
      .catch(error => console.error('Fetch Failed:', error));
  }

  removeFromCart({ productId, cartItemId }) {
    const requestCart = new Request('/api/cart');
    const req = {
      method: 'DELETE',
      body: JSON.stringify({ productId, cartItemId }),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(requestCart, req)
      .then(response => response.json())
      .then(data => this.getCartItems())
      .catch(error => console.error('Fetch Failed:', error));
  }

  componentDidMount() {
    this.getCartItems();
  }

  placeOrder({ fullName, email, phone, address, cardHolder, card, expiration, cvv }) {
    const requestOrder = new Request('/api/orders');
    const request = {
      method: 'POST',
      body: JSON.stringify({ fullName, email, phone, address, cardHolder, card, expiration, cvv }),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(requestOrder, request)
      .then(response => response.json())
      .then(order => this.setState({ view: { type: 'confirmation', params: {} }, cart: [] }))
      .catch(error => console.error('Fetch Failed:', error));
  }

  confirmPurchase(products) {
    this.setState({ confirmedProducts: products });
  }

  render() {
    let productElem;
    const viewType = this.state.view.type;
    const modal = this.state.showModal ? <LiveDemoModal close={this.closeModal} /> : null;
    if (viewType === 'catalog') {
      productElem = <ProductList viewData={this.setView} />;
    } else if (viewType === 'details') {
      productElem = <ProductDetails productData={this.state.view.params} viewData={this.setView} addItem={this.updateCart} />;
    } else if (viewType === 'cart') {
      productElem = <CartSummary cartItems={this.state.cart} remove={this.removeFromCart} update={this.updateCart} viewData={this.setView}/>;
    } else if (viewType === 'checkout') {
      productElem = <CheckoutForm checkout={this.placeOrder} viewData={this.setView} priceInfo={this.state.cart} confirm={this.confirmPurchase}/>;
    } else if (viewType === 'confirmation') {
      productElem = <CheckoutConfirmation viewData={this.setView} purchased={this.state.confirmedProducts} />;
    }
    return (
      <>
        <Header cart={this.state.cart} viewData={this.setView}/>
        <div className="container col-10">
          {modal}
        </div>
        {productElem}
        <Footer />
      </>
    );
  }
}
