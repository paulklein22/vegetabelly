import React, { Component } from 'react';
import logo from '../../img/logo.png';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import SearchZomato from '../search/SearchZomato';

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="title">
          <div className="row">
            <div className="col-md-8 m-auto">
              <img
                src={logo}
                alt="Vegetabelly Logo"
                className="logo img-fluid d-block mx-auto"
              />
              <h4 className="text-center text-muted mt-3">
                Search for local vegetarian-friendly restaurants
              </h4>
            </div>
          </div>
        </div>

        <SearchZomato />

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
