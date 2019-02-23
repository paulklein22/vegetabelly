import React, { Component } from 'react';
import logo from '../../img/logo.png';
// import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  state = {
    categories: undefined,
    cityID: undefined,
    restaurants: undefined,
    img: undefined,
    name: undefined,
    address: undefined,
    aggregate_rating: undefined,
    cuisines: undefined,
    cost: undefined,
    menu_url: undefined,
    url: undefined
  };

  render() {
    return (
      <div className="container">
        <div className="title">
          <div className="row">
            <div className="col-md-8 m-auto">
              <img
                src={logo}
                alt="Logo"
                className="logo img-fluid d-block mx-auto"
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="col">
            <div className="feedback alert alert-danger text-center">
              Please enter a city
            </div>
            <form id="searchForm" className="my-4">
              <div className="form-group my-3">
                <select
                  className="custom-select text-capitalize"
                  id="searchCategory"
                />
              </div>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control text-capitalize"
                  id="searchCity"
                  placeholder="Enter City"
                />
                <input
                  type="submit"
                  className="btn search-button btn-block mt-3"
                />
              </div>
            </form>

            <img src="img/loader.gif" className="loader" alt="" />
          </div>
        </div>

        <section className="py-5">
          <div className="container">
            <div className="row" id="restaurant-list" />
          </div>
        </section>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
