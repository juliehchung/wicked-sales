import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      cardHolder: '',
      card: '',
      expiration: '',
      cvv: '',
      acknowledgement: false,
      isDisabled: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  // setDisabled() {
  //   if (name !== '' && card !== '' && shippingAddress !== '') {
  //     this.setState({ isDisabled: false });
  //   } else {
  //     this.setState({ isDisabled: true });
  //   }
  // }

  handleSubmit(event) {
    event.preventDefault();
    const fullName = `${this.state.firstName} ${this.state.lastName}`;
    const address = `${this.state.address} \n${this.state.address2} \n${this.state.city}, ${this.state.state} ${this.state.zip}`;
    const cardHolder = this.state.cardHolder;
    const card = this.state.card.split(' ').join().split('-').join();
    const expiration = this.state.expiration.split('/').join().split('-').join();
    const cvv = this.state.cvv;
    this.props.checkout({ fullName, address, cardHolder, card, expiration, cvv });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.name !== prevState.name) {
      this.setDisabled(this.state.name, this.state.card, this.state.shippingAddress);
    } else if (this.state.card !== prevState.card) {
      this.setDisabled(this.state.name, this.state.card, this.state.shippingAddress);
    } else if (this.state.shippingAddress !== prevState.shippingAddress) {
      this.setDisabled(this.state.name, this.state.card, this.state.shippingAddress);
    }
  }

  render() {
    const viewCatalog = this.props.viewData;
    const cart = this.props.priceInfo;
    let totalPrice = 0;
    cart.forEach(product => {
      totalPrice = totalPrice + product.price * product.quantity;
    });
    // const total = '$' + ((totalPrice / 100).toFixed(2));
    return (
      <div className="container col-12 col-sm-10 col-md-8 col-lg-8 my-5">
        <div className="d-flex flex-wrap m-3">
          <form className="col-12" onSubmit={this.handleSubmit}>
            <h3 className="mb-3">Billing/Shipping</h3>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" id="firstName" value={this.state.firstName} name='firstName' onChange={this.handleChange} required />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" id="lastName" value={this.state.lastName} name='lastName' onChange={this.handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" className="form-control" id="address" value={this.state.address} name="address" placeholder="1234 Main St." required />
            </div>
            <div className="form-group">
              <label htmlFor="address2">Address 2</label>
              <input type="text" className="form-control" id="address2" value={this.state.address2} name="address2" placeholder="Apartment, Studio, or Floor" required />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="city">City</label>
                <input type="text" className="form-control" id="city" value={this.state.city} name="city" required />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="state">State</label>
                <select id="state" className="form-control" value={this.state.state} name="state" required >
                  <option defaultValue >Choose State...</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="zip">Zip</label>
                <input type="text" className="form-control" id="zip" value={this.state.zip} name="zip" required />
              </div>
            </div>
            <hr className="my-4" />
            <h3 className="mb-3">Payment</h3>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="cardHolder">Name on Card</label>
                <input type="text" className="form-control" id="cardHolder" value={this.state.cardHolder} name="cardHolder" required />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="cardNumber">Card Number</label>
                <input type="text" className="form-control" id="cardNumber" value={this.state.card} name="card" placeholder="0000 0000 0000 0000" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="expiration">Expiration</label>
                <input type="text" className="form-control" id="expiration" value={this.state.expiration} name="expiration" placeholder="MM/YYYY" required />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="cvv">CVV</label>
                <input type="text" className="form-control" id="cvv" value={this.state.cvv} name="cvv" placeholder="###" required />
              </div>
            </div>
            <hr className="my-4" />
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="acknowledgement" required />
              <label className="form-check-label" htmlFor="acknowledgement">I acknowledge that this is a demo application, and the information above is not my genuine financial or personal information.</label>
            </div>
            <hr className="my-4" />
            <button disabled={this.state.isDisabled} type="submit" className="btn btn-primary align-self-end">Submit</button>
          </form>
          <div className="container">
            <div className="row d-flex justify-content-between align-items-center my-3">
              <div className="back text-muted" onClick={() => viewCatalog('catalog', {})}>
                {'< Continue Shopping'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckoutForm;
