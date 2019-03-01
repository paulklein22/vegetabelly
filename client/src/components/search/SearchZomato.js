import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SearchInput, SearchBtn } from './index';

class SearchZomato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      restaurants: []
    };
  }

  componentDidMount() {
    this.loadRestaurants();
  }

  async loadRestaurants(city) {
    const apiKey = '850c0fa27d266b4e758f5337143ba64f';
    const headers = {
      Accept: 'application/json',
      'user-key': apiKey
    };

    // Search For City ID
    const cityInfo = await fetch(
      `https://developers.zomato.com/api/v2.1/cities?q=${city}`,
      {
        method: 'GET',
        headers
      }
    );
    const cityJSON = await cityInfo.json();
    const cityLocation = await cityJSON.location_suggestions;

    let cityID = 0;

    if (cityLocation.length > 0) {
      cityID = await cityLocation[0].id;
      fetch(
        `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&sort=rating&cuisines=308`,
        {
          method: 'GET',
          headers
        }
      )
        .then(res => res.json())
        .then(res => {
          this.setState({ restaurants: res.restaurants });
          console.log('this is res', res);
        })
        .catch(err => console.log(err));
    } else {
      console.log('error');
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const searchCity = document.getElementById('searchCity');
    const city = searchCity.value.toLowerCase();

    this.loadRestaurants(city);
    // Returns Text Field to Empty After Submission
    this.setState({ city: '' });
  };

  render() {
    const { restaurants } = this.state;
    console.log('this is state', this.state);
    // console.log(restaurants);
    // restaurants.forEach(index =>
    //   console.log(' this is name', index.restaurant.id)
    // );
    const restaurantCards = restaurants.map(index => (
      <div
        key={index.restaurant.id}
        className="card col-11 mx-auto my-3 col-md-4"
      >
        <div className="card">
          <div className="row p-1">
            <div className="col-5">
              <img
                // Try:
                // src={index.restaurant.thumb || index.restaurant.photos_url}
                src={index.restaurant.thumb}
                className="img-fluid img-thumbnail"
                alt="Restaurant"
              />
            </div>
            <div className="col-5 text-capitalize">
              <h5 className="name text-uppercase pt-2 redText">
                {index.restaurant.name}
              </h5>
              <h6>{index.restaurant.location.address}</h6>
            </div>
            <div className="col-1">
              <div className="badge badge-success">
                {index.restaurant.user_rating.aggregate_rating} / 5
              </div>
            </div>
          </div>
          <hr />
          <div className="row py-3 ml-1">
            <div className="col-5 text-uppercase ">
              <h6>Cuisines:</h6>
              <h6>Cost for two:</h6>
            </div>
            <div className="col-7 text-uppercase">
              <h6>{index.restaurant.cuisines}</h6>
              <h6>${index.restaurant.average_cost_for_two}</h6>
            </div>
          </div>
          <hr />
          <div className="row text-center no-gutters pb-3">
            <div className="col-6">
              <Link
                to={index.restaurant.menu_url}
                target="_blank"
                className="btn redBtn"
              >
                <i className="fas fa-book" /> Menu
              </Link>
            </div>
            <div className="col-6">
              <Link
                to={index.restaurant.url}
                target="_blank"
                className="btn redBtn"
              >
                <i className="fas fa-book" /> Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        <form>
          <SearchInput
            value={this.state.city}
            onChange={this.handleInputChange}
            // Remove if not needed
            id="searchCity"
            name="city"
            placeholder="Enter City"
          />
        </form>
        <SearchBtn disabled={!this.state.city} onClick={this.handleFormSubmit}>
          Search
        </SearchBtn>
        <hr />
        {restaurantCards}
      </div>
    );
  }
}

export default SearchZomato;
