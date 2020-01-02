import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      cardHolder: '',
      card: '',
      month: '',
      year: '',
      cvv: '',
      checkValidity: {
        fullName: true,
        email: true,
        phone: true,
        address: true,
        address2: true,
        city: true,
        state: true,
        zip: true,
        cardHolder: true,
        card: true,
        expiration: true,
        cvv: true
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange(event) {
    const numRegex = RegExp(/^[0-9]*$/);
    const zipRegex = RegExp(/^[0-9]*-*[0-9]*$/);

    switch (event.target.name) {
      case 'phone':
      case 'card':
      case 'cvv':
        if (numRegex.test(event.target.value)) {
          this.setState({ [event.target.name]: event.target.value });
        }
        break;
      case 'zip':
        if (zipRegex.test(event.target.value)) {
          this.setState({ [event.target.name]: event.target.value });
        }
        break;
      case 'fullName':
      case 'address':
      case 'address2':
      case 'city':
      case 'cardHolder':
        if (event.target.value.indexOf('  ') === -1) {
          this.setState({ [event.target.name]: event.target.value });
        }
        break;
      default:
        this.setState({ [event.target.name]: event.target.value });
        break;
    }

    const checkValidity = {
      fullName: true,
      email: true,
      phone: true,
      address: true,
      address2: true,
      city: true,
      state: true,
      zip: true,
      cardHolder: true,
      card: true,
      expiration: true,
      cvv: true
    };
    this.setState({ checkValidity });
  }

  handleSubmit(event) {
    event.preventDefault();

    const checkValidity = {
      fullName: true,
      email: true,
      phone: true,
      address: true,
      address2: true,
      city: true,
      state: true,
      zip: true,
      cardHolder: true,
      card: true,
      expiration: true,
      cvv: true
    };

    const emailRegex = RegExp(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const zipRegex = RegExp(/^[0-9]{5}(?:-[0-9]{4})?$/);

    const fullName = this.state.fullName.trim();
    if (fullName.length < 5) {
      checkValidity.fullName = false;
    }

    if (!emailRegex.test(this.state.email)) {
      checkValidity.email = false;
    }

    if (this.state.phone.length < 10) {
      checkValidity.phone = false;
    }

    const address = this.state.address.trim();
    if (address.length < 6) {
      checkValidity.address = false;
    }

    const city = this.state.city.trim();
    if (city.length < 3) {
      checkValidity.city = false;
    }

    if (this.state.state === '') {
      checkValidity.state = false;
    }

    if (!zipRegex.test(this.state.zip)) {
      checkValidity.zip = false;
    }

    const cardHolder = this.state.cardHolder.trim();
    if (cardHolder.length < 5) {
      checkValidity.cardHolder = false;
    }

    if (this.state.card.length < 16) {
      checkValidity.card = false;
    }

    if (this.state.month === '' || this.state.year === '') {
      checkValidity.expiration = false;
    }

    if (this.state.cvv.length < 3) {
      checkValidity.cvv = false;
    }

    if (Object.values(checkValidity).find(element => element === false) === undefined) {
      const placeOrder = {
        fullName: this.state.fullName,
        email: this.state.email,
        phone: this.state.phone,
        address: `${this.state.address} \n${this.state.address2} \n${this.state.city}, ${this.state.state} ${this.state.zip}`,
        cardHolder: this.state.cardHolder,
        card: this.state.card,
        expiration: `${this.state.month}/${this.state.year}`,
        cvv: this.state.cvv
      };
      this.props.confirm(this.props.priceInfo);
      this.props.checkout(placeOrder);
    } else {
      this.setState({ checkValidity });
    }

  }

  render() {
    const viewCatalog = this.props.viewData;
    const cart = this.props.priceInfo;
    let totalPrice = 0;
    cart.forEach(product => {
      totalPrice = totalPrice + (product.price * product.quantity);
    });
    const total = '$' + ((totalPrice / 100).toFixed(2));
    return (
      <div className="container col-12 col-sm-10 col-md-8 col-lg-8 my-5">
        <div className="d-flex flex-wrap m-3">
          <h2 className="col-12 text-secondary">Order Total: {total}</h2>
          <form className="col-12" onSubmit={this.handleSubmit}>
            <h3 className="my-3">Billing/Shipping</h3>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" maxLength="65" autoComplete="new-password" className={`form-control ${this.state.checkValidity.fullName ? null : 'is-invalid'}`} id="fullName" value={this.state.fullName} name='fullName' onChange={this.handleChange}/>
              <div className="invalid-feedback">Must be at least 5 characters.</div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="email">Email</label>
                <input type="text" maxLength="254" autoComplete="new-password" className={`form-control ${this.state.checkValidity.email ? null : 'is-invalid'}`} id="email" value={this.state.email} name='email' onChange={this.handleChange}/>
                <div className="invalid-feedback">Please enter a valid email.</div>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" maxLength="11" autoComplete="new-password" className={`form-control ${this.state.checkValidity.phone ? null : 'is-invalid'}`} id="phone" value={this.state.phone} name='phone' onChange={this.handleChange} placeholder="1234567890"/>
                <div className="invalid-feedback">Please enter a valid phone number (##########).</div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" maxLength="42" autoComplete="new-password" className={`form-control ${this.state.checkValidity.address ? null : 'is-invalid'}`} id="address" value={this.state.address} name="address" placeholder="1234 Main St." onChange={this.handleChange}/>
              <div className="invalid-feedback">Please enter a valid address.</div>
            </div>
            <div className="form-group">
              <label htmlFor="address2">Address 2</label>
              <input type="text" maxLength="42" autoComplete="new-password" className="form-control" id="address2" value={this.state.address2} name="address2" placeholder="Apartment, Studio, or Floor" onChange={this.handleChange}/>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="city">City</label>
                <input type="text" maxLength="50" autoComplete="new-password" className={`form-control ${this.state.checkValidity.city ? null : 'is-invalid'}`} id="city" value={this.state.city} name="city" onChange={this.handleChange}/>
                <div className="invalid-feedback">Please enter a valid city.</div>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="state">State</label>
                <select id="state" className={`form-control ${this.state.checkValidity.state ? null : 'is-invalid'}`} value={this.state.state} name="state" onChange={this.handleChange}>
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
                <div className="invalid-feedback">Please choose a state.</div>
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="zip">Zip</label>
                <input type="text" maxLength="10" autoComplete="new-password" className={`form-control ${this.state.checkValidity.zip ? null : 'is-invalid'}`} id="zip" value={this.state.zip} name="zip" onChange={this.handleChange}/>
                <div className="invalid-feedback">Please enter a valid zip code.</div>
              </div>
            </div>
            <hr className="my-4"/>
            <h3 className="mb-3">Payment</h3>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="cardHolder">Name on Card</label>
                <input type="text" maxLength="65" autoComplete="new-password" className={`form-control ${this.state.checkValidity.cardHolder ? null : 'is-invalid'}`} id="cardHolder" value={this.state.cardHolder} name="cardHolder" onChange={this.handleChange}/>
                <div className="invalid-feedback">Must be at least 5 characters.</div>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="cardNumber">Card Number</label>
                <input type="text" maxLength="16" autoComplete="new-password" className={`form-control ${this.state.checkValidity.card ? null : 'is-invalid'}`} id="cardNumber" value={this.state.card} name="card" placeholder="1234123412341234" onChange={this.handleChange}/>
                <div className="invalid-feedback">Please enter a valid card number.</div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="month">Month</label>
                <select id="month" autoComplete="new-password" className={`form-control ${this.state.checkValidity.expiration ? null : 'is-invalid'}`} value={this.state.month} name="month" onChange={this.handleChange}>
                  <option defaultValue>##</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <div className="invalid-feedback">Please choose a month.</div>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="year">Year</label>
                <select id="year" autoComplete="new-password" className={`form-control ${this.state.checkValidity.expiration ? null : 'is-invalid'}`} value={this.state.year} name="year" onChange={this.handleChange}>
                  <option defaultValue>####</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                </select>
                <div className="invalid-feedback">Please choose a year.</div>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="cvv">CVV</label>
                <input type="text" maxLength="4" autoComplete="new-password" className={`form-control ${this.state.checkValidity.cvv ? null : 'is-invalid'}`} id="cvv" value={this.state.cvv} name="cvv" placeholder="###" onChange={this.handleChange}/>
                <div className="invalid-feedback">Please enter a valid CVV.</div>
              </div>
            </div>
            <hr className="my-4"/>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="acknowledgement" required/>
              <label className="form-check-label" htmlFor="acknowledgement">I acknowledge that this is a demo application, and the information above is not my genuine financial or personal information.</label>
            </div>
            <hr className="my-4"/>
            <button type="submit" className="btn btn-success align-self-end">Submit</button>
          </form>
          <div className="col-12">
            <div className="row d-flex justify-content-between align-items-center my-3">
              <div className="click text-muted mt-2" onClick={() => viewCatalog('catalog', {})}>
                <i className="fas fa-arrow-circle-left mr-2"></i>
                Continue Shopping
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckoutForm;
