import React from 'react';

class CheckoutConfirmation extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    let totalPrice = 0;
    this.props.purchased.forEach(product => {
      totalPrice = totalPrice + (product.price * product.quantity);
    });
    const total = '$' + ((totalPrice / 100).toFixed(2));
    const confirmationList = this.props.purchased.map(product => {
      let price = product.price;
      price = '$' + ((price / 100).toFixed(2));
      return (
        <div className="bg-white border rounded col-md-8 py-4 my-3 mx-auto" key={product.productId}>
          <div className="row py-2">
            <img src={product.image} alt={product.name} className="cart-item img-fluid col-md-6" />
            <div className="col-md-6 d-flex flex-column align-self-center">
              <h4>{product.name}</h4>
              <h5 className="text-muted">{price}</h5>
              <h6>Quantity: {product.quantity}</h6>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="col-md-12 my-4">
        <h1 className="col-md-8 mx-auto">Your order has been placed!</h1>
        <h2 className="col-md-8 mx-auto text-muted">Order Total: {total}</h2>
        <div className="col-md-12 mx-auto">
          {confirmationList}
        </div>
        <div className="col-md-8 mb-5 mx-auto">
          <div className="click text-muted" onClick={() => this.props.viewData('catalog', {})}>
            <i className="fas fa-arrow-circle-left mr-2"></i>
            Continue Shopping
          </div>
        </div>
      </div>
    );
  }

}

export default CheckoutConfirmation;
