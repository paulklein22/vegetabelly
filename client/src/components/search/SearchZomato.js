import React, { Component } from 'react';
import placeholder from '../../img/placeholder_image.jpg';
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
          console.log(res);
        })
        .catch(err => console.log(err));
    } else {
      return null;
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

    const restaurantCards = restaurants.map(index => (
      <div
        key={index.restaurant.id}
        className="card card-border col-12 col-lg-4 col-md-6 mb-3"
      >
        <div className="card">
          <div className="row">
            <div className="col-6">
              <img
                src={
                  index.restaurant.thumb === ''
                    ? placeholder
                    : index.restaurant.thumb
                }
                className="card-img-top img-fluid img-thumbnail mt-2 ml-2"
                alt="Restaurant Food"
              />
            </div>
            <div className="col-6 card-body">
              <h5 className="card-title text-center text-uppercase lead">
                <strong>{index.restaurant.name}</strong>
              </h5>
            </div>
            <div className="card-body">
              <p className="card-text text-center text-capitalize">
                {index.restaurant.location.address}
              </p>
            </div>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item text-uppercase restaurant-card-list">
              {index.restaurant.cuisines}
            </li>
            <li className="list-group-item text-uppercase restaurant-card-list">
              Cost for Two: ${index.restaurant.average_cost_for_two}
            </li>
            <li className="list-group-item restaurant-card-list">
              USER RATING: {index.restaurant.user_rating.aggregate_rating} / 5 (
              {index.restaurant.user_rating.votes} reviews)
            </li>
          </ul>
          <div className="row">
            <div className="col-6 card-body text-center">
              <a
                href={index.restaurant.menu_url}
                target="_blank"
                className="btn redBtn"
              >
                <i className="fas fa-book-open" /> Menu
              </a>
            </div>
            <div className="col-6 card-body text-center">
              <a
                href={index.restaurant.url}
                target="_blank"
                className="btn redBtn"
              >
                <i className="fas fa-globe" /> Website
              </a>
            </div>
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        <div className="container">
          <div className="form-row mt-4">
            <div className="col-2" />
            <div className="col-7">
              <form>
                <SearchInput
                  value={this.state.city}
                  onChange={this.handleInputChange}
                  id="searchCity"
                  name="city"
                  placeholder="Enter city & state (e.g., Chicago, IL)"
                />
              </form>
            </div>
            <div className="col-1">
              <SearchBtn
                disabled={!this.state.city}
                onClick={this.handleFormSubmit}
              >
                Search
              </SearchBtn>
            </div>
            <div className="col-2" />
            <hr />
          </div>
        </div>
        <div className="container py-5 px-2">
          <div className="row" id="restaurant-list">
            {restaurantCards}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchZomato;
