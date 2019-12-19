import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: '',
      isDisabled: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    const name = this.state.name;
    const creditCard = this.state.creditCard;
    const shippingAddress = this.state.shippingAddress;
    this.setDisabled(name, creditCard, shippingAddress);
  }

  setDisabled(name, creditCard, shippingAddress) {
    if (name !== '' && creditCard !== '' && shippingAddress !== '') {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = this.state.name;
    const creditCard = this.state.creditCard;
    const shippingAddress = this.state.shippingAddress;
    this.props.checkout({ name, creditCard, shippingAddress });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.name !== prevState.name) {
      this.setDisabled(this.state.name, this.state.creditCard, this.state.shippingAddress);
    } else if (this.state.creditCard !== prevState.creditCard) {
      this.setDisabled(this.state.name, this.state.creditCard, this.state.shippingAddress);
    } else if (this.state.shippingAddress !== prevState.shippingAddress) {
      this.setDisabled(this.state.name, this.state.creditCard, this.state.shippingAddress);
    }
  }

  render() {
    const viewCatalog = this.props.viewData;
    const cart = this.props.priceInfo;
    let totalPrice = 0;
    cart.map(product => {
      totalPrice = totalPrice + product.price;
    });
    const total = '$' + ((totalPrice / 100).toFixed(2));
    return (
      <div className="container col-12 col-sm-10 col-md-8 col-lg-8 my-5">
        <div className="container col-12">
          <h2>My Cart</h2>
          <h5 className="text-muted">Order Total: {total}</h5>
        </div>
        <div className="d-flex flex-wrap m-3">
          <form className="col-12" onSubmit={this.handleSubmit}>
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
            <div className="container">
              <div className="row d-flex justify-content-between align-items-center my-3">
                <div className="back text-muted" onClick={() => viewCatalog('catalog', {})}>
                  {'< Continue Shopping'}
                </div>
                <button disabled={this.state.isDisabled} type="submit" className="btn btn-primary align-self-end">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CheckoutForm;
