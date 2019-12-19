import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const viewCatalog = this.props.viewData;
    const placeOrder = this.props.checkout;
    const cart = this.props.priceInfo;
    let totalPrice = 0;
    cart.map(product => {
      totalPrice = totalPrice + product.price;
    });
    const total = '$' + ((totalPrice / 100).toFixed(2));
    return (
      <div className="container col-xl-11 mt-5">
        <h2 className="container ml-4">My Cart</h2>
        <h5 className="container back text-muted ml-4">Order Total: {total}</h5>
        <div className="container d-flex flex-wrap m-3">
          <div className="col-xl-10 ml-5">
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" value={this.state.name} name='name' onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label>Credit Card</label>
              <input type="text" className="form-control" value={this.state.creditCard} name='creditCard' onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label>Shipping Address</label>
              <textarea className="form-control" rows="5" value={this.state.shippingAddress} name='shippingAddress' onChange={this.handleChange}></textarea>
            </div>
            <div className="container mt-3 mb-5 d-flex justify-content-between">
              <div className="back text-muted mt-4" onClick={() => viewCatalog('catalog', {})}>
                {'< Continue Shopping'}
              </div>
              <button type="submit" className="btn btn-primary mt-3" onClick={() => placeOrder(this.state)}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckoutForm;
