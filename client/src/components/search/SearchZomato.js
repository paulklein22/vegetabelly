import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SearchInput, SearchBtn } from './index';

class SearchZomato extends Component {
  // Need Props Here??????????????
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    };
  }

  componentDidMount() {
    // const {  } = this.props;
    // const {  } = this.state;

    const api = 'https://developers.zomato.com/api/v2.1/';
    const apiKey = '850c0fa27d266b4e758f5337143ba64f';
    const headers = {
      Accept: 'application/json',
      'user-key': apiKey
    };

    fetch(
      `${api}search?entity_id=292&entity_type=city&sort=rating&cuisines=308`,
      {
        method: 'GET',
        headers
      }
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { restaurants } = this.state;
    const restaurantCards = restaurants.map(restaurant => (
      <div key={restaurant.id} className="card col-11 mx-auto my-3 col-md-4">
        <div className="card">
          <div className="row p-1">
            <div className="col-5">
              <img
                src={restaurant.thumb}
                className="img-fluid img-thumbnail"
                alt=""
              />
            </div>
            <div className="col-5 text-capitalize">
              <h5 className="name text-uppercase pt-2 redText">
                {restaurant.name}
              </h5>
              <h6>{restaurant.location.address}</h6>
            </div>
            <div className="col-1">
              <div className="badge badge-success">
                {restaurant.user_rating.aggregate_rating} / 5
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
              <h6>{restaurant.cuisines}</h6>
              <h6>${restaurant.average_cost_for_two}</h6>
            </div>
          </div>
          <hr />
          <div className="row text-center no-gutters pb-3">
            <div className="col-6">
              <Link
                to={restaurant.menu_url}
                target="_blank"
                className="btn redBtn"
              >
                <i className="fas fa-book" /> Menu
              </Link>
            </div>
            <div className="col-6">
              <Link to={restaurant.url} target="_blank" className="btn redBtn">
                <i className="fas fa-book" /> Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    ));

    return (
      <div ref="myRef">
        <form>
          <SearchInput
            value={this.state.author}
            onChange={this.handleInputChange}
            name="city"
            placeholder="Enter City"
          />
        </form>
        <SearchBtn
          disabled={!(this.state.author && this.state.title)}
          onClick={this.handleFormSubmit}
        >
          Search
        </SearchBtn>
        <hr />
        <h3 className="text-center mb-4">
          Vegetarian-Friendly Restaurants Near You:
        </h3>
        {restaurantCards}
      </div>
    );
  }
}

export default SearchZomato;
