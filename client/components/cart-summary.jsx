import React from 'react';
import CartSummaryItem from './cart-summary-item';
import RemoveItemModal from './remove-item-modal';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      removingItem: {}
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  removeItem(product) {
    this.setState({ removingItem: product });
  }

  render() {
    const cart = this.props.cartItems;
    const changeView = this.props.viewData;
    let totalPrice = 0;
    cart.forEach(product => {
      totalPrice = totalPrice + (product.price * product.quantity);
    });
    const total = '$' + ((totalPrice / 100).toFixed(2));
    const modal = this.state.showModal ? <RemoveItemModal toggleModal={this.toggleModal} remove={this.props.remove} removeProduct={this.state.removingItem} /> : null;
    if (cart.length === 0) {
      return (
        <div className="container col-10 my-5">
          <div className="back text-muted my-3" onClick={() => changeView('catalog', {})}>
            {'< Back to Catalog'}
          </div>
          <h2>Your cart is empty!</h2>
        </div>
      );
    }
    return (
      <div className="container col-10 my-5">
        <div className="container col-10">
          {modal}
        </div>
        <div className="back text-muted my-3" onClick={() => changeView('catalog', {})}>
          {'< Back to Catalog'}
        </div>
        <h2>My Cart</h2>
        <div className="d-flex flex-wrap">
          {cart.map(cartItem => <CartSummaryItem key={cartItem.cartItemId} toggleModal={this.toggleModal} cartData={cartItem} removeProduct={this.removeItem} update={this.props.update} />)}
        </div>
        <div className="container">
          <div className="row d-flex justify-content-between align-items-center my-3">
            <h4>Total: {total}</h4>
            <button className="btn btn-primary align-self-end" onClick={() => changeView('checkout', {})}>Checkout</button>
          </div>
        </div>
      </div>
    );
  }

}

export default CartSummary;
